import axios from 'axios'

const API_URL='http://localhost:5000'

const api=axios.create({
    baseURL:API_URL,
    timeout:3000

})
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); 
        if (token) {
            config.headers['Authorization'] = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api