import axios from "axios";

axios.defaults.baseURL = 'http://api.talayto.com/v1';
localStorage.setItem('access-token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjY0YmJjNzEyMzhkMjAzNzA2YmM1YSIsImlhdCI6MTY5NzYzMTcxMiwiZXhwIjoxNzAxMjMxNzEyfQ.5b-9tJfYV92NmKsw7hEDN8mlNmIyj-IftfX3mlADBC0')
axios.interceptors.request.use(function (config) {
    if (!localStorage.getItem("access-token")) {
        window.location.href = "http://www.talayto.com/login";
    }

    config.headers['access-token'] = localStorage.getItem("access-token")
    config.headers['Content-Type'] = 'application/json'

    return config;
}, function (error) {
    return Promise.reject(error);
});
