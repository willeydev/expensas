import axios from "axios";
import { getEnvs } from "./apiConfig";
import { getToken } from "./userService";
const API_URL= getEnvs().API_URL;

async function createCategory(data) {
    const response = axios.post(API_URL+"/categories", data, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response;
}

async function getCategories(limit, offset) {
    const response = await axios.get(`${API_URL}/categories?limit=${limit}&offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    
    return response;
}

module.exports = {
    createCategory,
    getCategories
}
