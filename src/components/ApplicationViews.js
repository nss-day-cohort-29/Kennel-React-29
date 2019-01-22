import { Route } from "react-router-dom";
import React, { Component } from "react";
import AnimalList from "./animal/AnimalList";
import LocationList from "./location/LocationList";
import EmployeeList from "./employee/EmployeeList";
import AnimalManager from "../modules/AnimalManager";
import LocationManager from "../modules/LocationManager";
import EmployeeManager from "../modules/EmployeeManager";
import OwnerManager from "../modules/OwnerManager";
import AnimalDetail from "./animal/AnimalDetail";

export default class ApplicationViews extends Component {
  state = {
    animals: [],
    employees: [],
    locations: []
  };

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
        <Route
          exact
          path="/"
          render={props => {
            return <LocationList locations={this.state.locations} />;
          }}
        />
        <Route
          exact
          path="/animals"
          render={props => {
            return <AnimalList animals={this.state.animals} />;
          }}
        />
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
        <Route
          exact
          path="/employees"
          render={props => {
            return <EmployeeList employees={this.state.employees} />;
          }}
        />
      </React.Fragment>
    );
  }
}
