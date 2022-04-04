import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://192.53.172.221:3000/api/Tourist";

export async function getTourist(page: number) {
    let response;
    try {
        response = await axios.get(API_URL + "?page=" + page, { headers: authHeader() } );
    } catch (e) {
        response = {};
    }

    return Promise.resolve(response);
}
