const remoteURL = "http://localhost:5002";

export default {
  get(id) {
    return fetch(`${remoteURL}/attendance/${id}`).then(e => e.json());
  },
  getAll() {
    return fetch(`${remoteURL}/attendance`).then(e => e.json());
  },
  post(newTime) {
    return fetch(`${remoteURL}/attendance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTime)
    }).then(data => data.json());
  },
  put (id, changes){
    console.log(changes, id)
    return fetch (`${remoteURL}/attendance/${id}`,{
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(changes)
    })
  }
};