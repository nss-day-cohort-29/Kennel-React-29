const remoteURL = "http://localhost:5002";

export default {
  get(id) {
    return fetch(`${remoteURL}/owners/${id}`).then(e => e.json());
  },
  getAll() {
    return fetch(`${remoteURL}/owners`).then(e => e.json());
  }
};
