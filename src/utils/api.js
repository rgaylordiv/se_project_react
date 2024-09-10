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
    return fetch(`${baseUrl}/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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
            'Content-Type': 'application/json'
        }
    }).then(checkResponse);
}

export { getItems, addItem, removeItem };