import axios from "axios";
import { getEnvs } from "./apiConfig";
import { getToken } from "./userService";
const API_URL= getEnvs().API_URL;

async function createAccount(data) {
    const response = axios.post(API_URL+"/accounts", data, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response;
}

async function getAccounts(limit, offset) {
    const response = await axios.get(`${API_URL}/accounts?limit=${limit}&offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    
    return response;
}

module.exports = {
    createAccount,
    getAccounts
}
