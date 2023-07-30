import axios from "axios";

axios.defaults.baseURL = 'http://91.107.160.88:3001/v1';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers['access-token'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YmZhYTMwNGViMDJiNDI0YmU1NTA5MyIsImlhdCI6MTY5MDI4Nzg1NSwiZXhwIjoxNjkzODg3ODU1fQ.WySC-UCpj8abMiiD3vaTA_QU9CrYjgPwy-80sIdCEf8"
    config.headers['Content-Type'] = 'application/json'

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
