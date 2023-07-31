import axios from "axios";

axios.defaults.baseURL = 'http://91.107.160.88:3001/v1';

axios.interceptors.request.use(function (config) {
    if (!localStorage.getItem("access-token")){
        localStorage.setItem("access-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YmZhYTMwNGViMDJiNDI0YmU1NTA5MyIsImlhdCI6MTY5MDI4Nzg1NSwiZXhwIjoxNjkzODg3ODU1fQ.WySC-UCpj8abMiiD3vaTA_QU9CrYjgPwy-80sIdCEf8")
    }
    config.headers['access-token'] = localStorage.getItem("access-token")
    config.headers['Content-Type'] = 'application/json'

    return config;
}, function (error) {
    return Promise.reject(error);
});
