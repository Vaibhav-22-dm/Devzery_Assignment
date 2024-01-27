import axios from "axios";
import React from "react";

const baseURL = "http://127.0.0.1:8000/api/";

export const login = async (username, password) => {
    const data = await axios.post(baseURL + "login/", {username: username, password: password})
    .then(res => {
        return res.data
    })
    .catch(err => {
        return err.response.data
    })
    return data
}

export const register = async (username, password, email) => {
    const data = await axios.post(baseURL + "register/", { username: username, password: password, email: email })
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err.response.data
        })
    return data
}

export const search = async (username) => {
    const data = await axios.get(baseURL + "search" + (username===null ? "" : "?startswith="+username),
            {
                headers: { 
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err.response.data
        })
    return data
}

export const update = async (username, email) => {
    const data = await axios.post(baseURL + "update/", {username: username, email: email}, 
            {
                headers: {
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err.response.data
        })
    return data
}

export const request_reset = async (email) => {
    const data = await axios.post(baseURL + "request_reset/", { email: email })
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err.response.data
        })
    return data
}

export const reset_password = async (password, uidb64, token) => {
    const data = await axios.post(baseURL + "reset_password/", { password: password, uidb64: uidb64, token: token })
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err.response.data
        })
    return data
}