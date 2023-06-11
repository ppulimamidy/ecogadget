// AuthService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth/';

const getToken = () => {
    //const authToken = JSON.parse(localStorage.getItem('authToken'));
   // return authToken?.token;

   const authToken = localStorage.getItem('authToken');
   return authToken;
   
};


const register = (username, email, password) => {
    return axios.post(API_URL + 'register', {
        username,
        email,
        password,
    });
};

const login = (email, password) => {
    return axios
        .post(API_URL + 'login', {
            email,
            password,
        })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
                localStorage.setItem('authToken', response.data.token);
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem('user');
    return true;
  };

export default {
    register,
    login,
    logout,
    getToken,
};
