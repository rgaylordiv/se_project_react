import * as token from '../utils/token'
const baseUrl = 'http://localhost:3001';

export const register = ({email, password, name, avatar}) => {
    const payload = { email, password, name, avatar };
    console.log("Register Payload:", payload);
    return fetch(`${baseUrl}/signup`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name, avatar }),
    })
    .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    })
};

export const authorize = ({email, password}) => {
    const payload = { email, password };
    console.log("Login Payload:", payload);
    return fetch(`${baseUrl}/signin`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
    .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    })
};

export const getUserInfo = () => {
    const userToken = token.getToken();
    return fetch(`${baseUrl}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
        },
    })
    .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    })
};

export const editProfile = ({ name, avatar }) => {
    const userToken = token.getToken();
    return fetch(`${baseUrl}/users/me`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ name, avatar }),
    })
    .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    })
};