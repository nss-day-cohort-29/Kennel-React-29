import { Route } from "react-router-dom";
import React, { Component } from "react";
import AnimalList from "./animal/AnimalList";
import LocationList from "./location/LocationList";
import EmployeeList from "./employee/EmployeeList";

export default class ApplicationViews extends Component {
  state = {
    animals: [],
    employees: []
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
    const newState = {};

    fetch("http://localhost:5002/animals")
      .then(r => r.json())
      .then(animals => (newState.animals = animals))
      .then(() => fetch("http://localhost:5002/employees").then(r => r.json()))
      .then(employees => (newState.employees = employees))
      .then(() => this.setState(newState));
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
            return (
              <AnimalList
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