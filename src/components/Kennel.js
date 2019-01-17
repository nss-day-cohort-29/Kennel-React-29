import React, { Component } from "react";
import EmployeeList from "./employee/EmployeeList"; // Import EmployeeList component

//this is our parent component
export default class Kennel extends Component {
  render() {
    return (
      <div>
        <h3>Student Kennels</h3>
        <h4>Nashville North Location</h4>
        <h5>500 Puppy Way</h5>
        {/* we are now rendering the child component, employee list, inside of the parent component, Kennel*/}
        <EmployeeList />
      </div>
    );
  }
}
