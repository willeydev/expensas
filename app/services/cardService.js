import axios from "axios";

import { getEnvs } from "./apiConfig";
import { getToken } from "./userService";

const API_URL= getEnvs().API_URL;

async function createCreditCard(data) {
    const response = axios.post(API_URL+"/credit_cards", data, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response;
}

async function getCards(limit, offset) {
    const response = await axios.get(`${API_URL}/credit_cards?limit=${limit}&offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    
    return response;
}

async function deleteCard(id) {
    const response = await axios.delete(`${API_URL}/credit_cards/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    
    return response;
}

module.exports = {
    createCreditCard,
    getCards,
    deleteCard
}
