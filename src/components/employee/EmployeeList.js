import React, { Component } from "react";
// import person from "./person.png";
// import "./Employee.css";
import AnimalCard from "../animal/AnimalCard";

export default class EmployeeList extends Component {
  render() {
    return (
      <section className="employees">
        {/* this .map loops through the list of employees*/}
        {this.props.employees.map(employee => (
          <div key={employee.id} className="card card--employee">
            <div className="card-body">
              <h5 className="card-title">
                {/* <img src={person} className="icon--employee" /> */}
                {employee.name}
                <a
                  href="#"
                  onClick={() => this.props.deleteEmployee(employee.id)}
                  className="card-link"
                >
                  Delete
                </a>
              </h5>

              <h6 className="card-subtitle mb-2 text-muted">Caretaker for:</h6>
              <div className="animals--caretaker">
                {this.props.animals
                  // this .filter() returns an array of all items where this condition is true
                  .filter(anml => anml.employeeId === employee.id)
                  //this .map() loops over the new array (made from the above .filter()) of the animals who match the employee ID and re-renders our reusable component (to make the cards)
                  .map(anml => (
                    <AnimalCard key={anml.id} animal={anml} {...this.props} />
                  ))}
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  }
}
