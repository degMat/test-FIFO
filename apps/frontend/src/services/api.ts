import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Remplacez par votre URL d'API

const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-type": "application/json"
  }
});
class ApiService {
  public getAllActions(page: number, pageSize: number) {
      const params = {
        page,
        pageSize
      }
    return http.get("/actions", {params});
  }

  public getAllTypeActions() {
    return http.get("/typeActions");
  }

  public addActionInQueue(typeActionId: number) {
    return http.post("/actions",{
      typeActionId: typeActionId,
    });
  }
}

export default new ApiService();
