const API_URL= 'http://127.0.0.1:8000/api'

import axios from "axios";

import { getToken } from "./userService";

async function createCreditCard(data) {
    const response = axios.post(API_URL+"/credit_cards", data, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response;
}

module.exports = {
    createCreditCard
}
