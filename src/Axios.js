import axios from "axios";

axios.defaults.baseURL = 'http://91.107.160.88:3001/v1';

axios.interceptors.request.use(function (config) {
    if (!localStorage.getItem("access-token")){
        localStorage.setItem("access-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YmZiNjQwNGViMDJiNDI0YmU1NTE2ZiIsImlhdCI6MTY5MDgxODE0NSwiZXhwIjoxNjk0NDE4MTQ1fQ.YDmJ2vsFkpz2MtXX4EMbKh7DntS3TF_n1zsFL26R0vo")
    }
    config.headers['access-token'] = localStorage.getItem("access-token")
    config.headers['Content-Type'] = 'application/json'

    return config;
}, function (error) {
    return Promise.reject(error);
});
