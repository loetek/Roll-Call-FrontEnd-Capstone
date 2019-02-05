const remoteURL = "http://localhost:5002";

export default {
  get(id) {
    return fetch(`${remoteURL}/users/${id}`).then(e => e.json());
  },
  getAll() {
    return fetch(`${remoteURL}/users`).then(e => e.json());
  },
  getUsernameAndPassword(username, password){
    return fetch(`${remoteURL}/users?username=${username}&password=${password}`)
    .then(response => response.json())
},

  post(newUser) {
    return fetch(`${remoteURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    }).then(data => data.json());
  }
};