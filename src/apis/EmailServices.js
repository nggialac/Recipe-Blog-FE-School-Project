import http from "../apis/http-common";

const sendEmailDefault = data => {
    return http.post("mail/sendingemail", data);
}

const sendEmailHtml = (data) => {
    return http.post("mail/sendingemailhtml", data);
}

export default {
    sendEmailDefault,
    sendEmailHtml,
};