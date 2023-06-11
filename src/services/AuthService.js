// AuthService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth/';

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
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
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
};
