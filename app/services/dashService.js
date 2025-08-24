import axios from "axios";
import { getToken } from "./userService";

import { getEnvs } from "./apiConfig";
const API_URL= getEnvs().API_URL;

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
