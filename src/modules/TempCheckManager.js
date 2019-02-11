const remoteURL = "http://localhost:5002";

export default {
  get(id) {
    return fetch(`${remoteURL}/tempChecks/${id}`).then(e => e.json());
  },
  getAll() {
    return fetch(`${remoteURL}/tempChecks`).then(e => e.json());
  },
  post(newTempCheck) {
    return fetch(`${remoteURL}/tempChecks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTempCheck)
    }).then(data => data.json());
  },
  put (id, changes){
    console.log(changes, id)
    return fetch (`${remoteURL}/tempChecks/${id}`,{
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(changes)
    })
  }
};