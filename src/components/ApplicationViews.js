import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import AnimalList from "./animal/AnimalList";
import LocationList from "./location/LocationList";
import EmployeeList from "./employee/EmployeeList";
import AnimalManager from "../modules/AnimalManager";
import LocationManager from "../modules/LocationManager";
import EmployeeManager from "../modules/EmployeeManager";
import OwnerManager from "../modules/OwnerManager";
import AnimalDetail from "./animal/AnimalDetail";
import AnimalForm from "./animal/AnimalForm";
import Login from "./authentication/Login";

export default class ApplicationViews extends Component {
  state = {
    animals: [],
    employees: [],
    locations: []
  };

  // Check if credentials are in local storage
  isAuthenticated = () => sessionStorage.getItem("credentials") !== null;

  deleteAnimal = id => {
    return fetch(`http://localhost:5002/animals/${id}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(() => fetch(`http://localhost:5002/animals`))
      .then(response => response.json())
      .then(animals =>
        this.setState({
          animals: animals
        })
      );
  };

  addAnimal = animal =>
    AnimalManager.post(animal)
      .then(() => AnimalManager.getAll())
      .then(animals =>
        this.setState({
          animals: animals
        })
      );

  componentDidMount() {
    // Example code. Make this fit into how you have written yours.
    AnimalManager.getAll().then(allAnimals => {
      this.setState({
        animals: allAnimals
      });
    });

    LocationManager.getAll().then(allLocations => {
      this.setState({
        locations: allLocations
      });
    });

    EmployeeManager.getAll().then(allEmployees => {
      this.setState({
        employees: allEmployees
      });
    });

    OwnerManager.getAll().then(allOwners => {
      this.setState({
        owners: allOwners
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <Route path="/login" component={Login} />

        <Route
          exact
          path="/"
          render={props => {
            return <LocationList locations={this.state.locations} />;
          }}
        />
        {/* this is the list of animals */}
        <Route
          exact
          path="/animals"
          render={props => {
            return (
              <AnimalList
                {...props}
                deleteAnimal={this.deleteAnimal}
                animals={this.state.animals}
              />
            );
          }}
        />
        {/* this is the detail for individual animal */}
        <Route
          path="/animals/:animalId(\d+)"
          render={props => {
            return (
              <AnimalDetail
                {...props}
                deleteAnimal={this.deleteAnimal}
                animals={this.state.animals}
              />
            );
          }}
        />
        {/* this is the animal add form */}
        <Route
          path="/animals/new"
          render={props => {
            return (
              <AnimalForm
                {...props}
                addAnimal={this.addAnimal}
                employees={this.state.employees}
              />
            );
          }}
        />
        <Route
          exact
          path="/employees"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <EmployeeList
                  deleteEmployee={this.deleteEmployee}
                  employees={this.state.employees}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
      </React.Fragment>
    );
  }
}
