import axios from "axios";

import { getEnvs } from "./apiConfig";
import { getToken } from "./userService";

const API_URL= getEnvs().API_URL;

async function createTransaction(data) {
    const response = axios.post(API_URL+"/transactions", data, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response;
}

module.exports = {
    createTransaction
}
