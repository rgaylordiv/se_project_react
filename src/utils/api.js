import { getToken } from "./token";

const token = getToken();
console.log("getToken:", getToken());
console.log("Token:", token);

const baseUrl = 'http://localhost:3001';

function checkResponse(res){
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function getItems(){
    return fetch(`${baseUrl}/items`, {
        method: 'GET',
    })
    .then(checkResponse);
}

function addItem({name, weather, link}){
    console.log('add items:', name, weather, link);
    return fetch(`${baseUrl}/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name,
            weather,
            link
        })
    }).then(checkResponse);
}

function removeItem(id){
    return fetch(`${baseUrl}/items/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }).then(checkResponse);
}

function addCardLike(id){
    return fetch(`${baseUrl}/items/${id}/likes`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }).then(checkResponse);
}

function removeCardLike(id){
    return fetch(`${baseUrl}/items/${id}/likes`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }).then(checkResponse);
}

export { getItems, addItem, removeItem, checkResponse, addCardLike, removeCardLike };