const API_URL= 'http://127.0.0.1:8000/api'

import axios from "axios";
import { getToken } from "./userService";

async function getDashboard(data) {
    
    const response = await axios.get(`${API_URL}/dashboard`, {
      params: {
        dueDate_start: data.startDate,
        dueDate_end: data.endDate
      },
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    
    return response;
}

module.exports = {
    getDashboard
}
