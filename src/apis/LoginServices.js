import React from 'react';

const getUser = () => {
    return http.get("/login");
}

export default {
    getUser
};