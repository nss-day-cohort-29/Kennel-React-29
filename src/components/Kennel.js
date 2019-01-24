import React, { Component } from "react";
import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";
import "./Kennel.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchManager from "../modules/SearchManager"

class Kennel extends Component {
  state = {
    animals: [],
    employees: [],
    locations: []
  }

  searchAllData = (searchQuery) => {
    const newSearchResults = {}
    return SearchManager.searchAnimals(searchQuery)
    .then(response => newSearchResults.animals = response)
    .then(() => SearchManager.searchEmployees(searchQuery))
    .then(response => newSearchResults.employees = response)
    .then(() => SearchManager.searchLocations(searchQuery))
    .then(response => newSearchResults.locations = response)
    .then(() => this.setState(newSearchResults))
  }
  render() {
    return (
      <React.Fragment>
        <NavBar searchAllData = {this.searchAllData} />
        <ApplicationViews animals= {this.state.animals} employees={this.state.employees} locations={this.state.locations}/>
      </React.Fragment>
    );
  }
}

export default Kennel;
