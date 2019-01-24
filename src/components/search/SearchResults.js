import React, { Component } from "react";

export default class SearchResults extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="search--results">
        {/* I would refactor by putting this code that's repeated three times into its own module and then looping to render the new module thrice. */}
          <h3>{Object.keys(this.props)[0]}</h3>
          {this.props.animals.map(result => (
            <p>{result.name}</p>
          ))}
          <h3>{Object.keys(this.props)[1]}</h3>

          {this.props.employees.map(result => (
            <p>{result.name}</p>
          ))}
          <h3>{Object.keys(this.props)[2]}</h3>

          {this.props.locations.map(result => (
            <p>{result.name}</p>
          ))}
        </section>
      </React.Fragment>
    );
  }
}
