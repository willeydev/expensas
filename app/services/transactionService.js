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

async function deleteTransaction(data) {
    const response = axios.post(API_URL+"/payment_details/update_delete/"+data.id, data, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response;
}

async function getTransactions(limit, offset, startDate, endDate) {
    const response = await axios.get(`${API_URL}/payment_details?limit=${limit}&offset=${offset}&dueDate_start=${startDate}&dueDate_end=${endDate}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    
    return response;
}

module.exports = {
    createTransaction,
    getTransactions,
    deleteTransaction
}
