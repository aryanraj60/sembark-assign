import axios from "axios";

// Para rodar: json-server --watch db.json
export const fakeStoreApi = axios.create({
  baseURL: "https://fakestoreapi.com",
});
