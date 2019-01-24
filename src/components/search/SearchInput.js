import React, { Component } from "react";
import {withRouter} from 'react-router-dom'
// https://tylermcginnis.com/react-router-programmatically-navigate/


class SearchInput extends Component {
  // Set initial state
  state = {
    searchQuery: ""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  handleSearch = evt => {
    evt.preventDefault()
    this.props.searchAllData(this.state.searchQuery)
    .then(() => this.props.history.push("/search"))
  }

  render() {
    return (
      <React.Fragment>
        <form className="searchForm" onSubmit={this.handleSearch}>
        {/* The id of the input matches the key of the property that reflects the user input in state so that we can write a reusable method (handleFieldChange) to update state for all input fields */}
          <input
            type="text"
            required
            className="form-control"
            onChange={this.handleFieldChange}
            id="searchQuery"
          />
        </form>
      </React.Fragment>
    );
  }
}

export default withRouter(SearchInput)
