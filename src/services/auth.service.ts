import axios from "axios";

const API_URL = "http://192.53.172.221:3000/api/authaccount/";

export const register = (name: string, email: string, password: string) => {
    return axios.post(API_URL + "registration", {
        name,
        email,
        password
    });
};

export const login = (email: string, password: string) => {
    return axios.post(API_URL + "login", {
        email,
        password,
    })
    .then((response)=>{
        console.log(response)
        if(response.data.data.Token) {
            localStorage.setItem("user", JSON.stringify(response.data.data));
        } return response.data;
    });
};

export const logout = () => {
    localStorage.removeItem("user");
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
};

