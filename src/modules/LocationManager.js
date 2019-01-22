const remoteURL = "http://localhost:5002";

export default {
  get(id) {
    return fetch(`${remoteURL}/locations/${id}`).then(e => e.json());
  },
  getAll() {
    return fetch(`${remoteURL}/locations`).then(e => e.json());
  }
};
