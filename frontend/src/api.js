import axios from 'axios'

const API_URL='http://localhost:5000'

const api=axios.create({
    baseURL:API_URL,
    timeout:3000

})

export default api