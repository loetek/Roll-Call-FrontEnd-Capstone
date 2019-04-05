const remoteURL =  process.env.NODE_ENV === 'production'
? ""
: "http://localhost:5002/";

export default {
  get(id) {
    return fetch(`${remoteURL}/agendas/${id}`).then(e => e.json());
  },
  getAll() {
    return fetch(`${remoteURL}/agendas`).then(e => e.json());
  },
  post(newAgenda) {
    return fetch(`${remoteURL}/agendas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newAgenda)
    }).then(data => data.json());
  },
  put (id, changes){
    console.log(changes, id)
    return fetch (`${remoteURL}/agendas/${id}`,{
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(changes)
    })
  }
};