const remoteURL = "http://localhost:5002";

export default {
  get(id,category) {
    return fetch(`${remoteURL}/${category}/${id}`).then(e => e.json());
  },
  getAll(category) {
    return fetch(`${remoteURL}/${category}`).then(e => e.json());
  },

};