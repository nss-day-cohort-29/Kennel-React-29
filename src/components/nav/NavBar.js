import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import auth0Client from '../../Auth';


class NavBar extends Component {
    signOut = () => {
        auth0Client.signOut();
        this.props.history.replace('/');
      };

    render() {
        return (
            <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Locations</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/animals">Animals</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/employees">Employees</Link>
                    </li>
{/* Auth0 code for checking to see if user is logged in. If they are, display profile name and sign out button. If they are not., display sign in button.  */}
                    {
                        !auth0Client.isAuthenticated() &&
                        <button className="btn btn-dark" onClick={auth0Client.signIn}>Sign In</button>
                    }
                    {
                        auth0Client.isAuthenticated() &&
                        <div>
                            <label>{auth0Client.getProfile().name}</label>
                            <button className="btn btn-dark" onClick={() => { this.signOut() }}>Sign Out</button>
                        </div>
                    }
                </ul>
            </nav>
        )
    }
}

export default withRouter(NavBar)
