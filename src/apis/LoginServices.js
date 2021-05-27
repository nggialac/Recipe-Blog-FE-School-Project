import http from "../apis/http-common";

const getLogin = data => {
    return http.post("login", data);
}

export default {
    getLogin
};