const remoteURL = "http://localhost:5002";

export default {
  searchAnimals(query) {
    return fetch(`${remoteURL}/animals?q=${query}`).then(e => e.json());
  },
  searchEmployees(query) {
    return fetch(`${remoteURL}/employees?q=${query}`).then(e => e.json());
  },
  searchLocations(query) {
    return fetch(`${remoteURL}/locations?q=${query}`).then(e => e.json());
  }
  // searchAll(query) {
  //   return Promise.all([this.searchAnimals(query), this.searchEmployees(query), this.searchLocations(query)])
  // }
};
