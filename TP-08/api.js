import axios from "axios";

const api = axios.create({
  baseURL: "https://cataas.com"
});

const apiComentarios = axios.create({
  baseURL: "https://api.api-ninjas.com/v2",
  headers: {
    "X-Api-Key": "V0SWkB5h2oJxeMX0ZzqevFEtXONbpJ7BTfRWArom"
  }
});

export { api, apiComentarios };