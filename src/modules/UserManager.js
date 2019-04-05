const remoteURL =  process.env.NODE_ENV === 'production'
? ""
: "http://localhost:5002/";

export default {
  get(id) {
    return fetch(`${remoteURL}/users/${id}`).then(e => e.json());
  },
  getAll() {
    return fetch(`${remoteURL}/users`).then(e => e.json());
  },
  post(newUser) {
    return fetch(`${remoteURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    }).then(data => data.json());
  },
  put (id, changes){
    console.log(changes, id)
    return fetch (`${remoteURL}/users/${id}`,{
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(changes)
    })
  }
};