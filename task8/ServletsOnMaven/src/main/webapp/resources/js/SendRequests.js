const headers = {
    'Content-Type': 'application/json;charset=utf-8'
};

function sendGetRequest(url, paramName = null, id = null) {
    let urlForRequest = paramName == null ? url : url + `?${paramName}=${id}`;
    return fetch(urlForRequest, {
        method:"GET",
        headers:headers
    }).then(resp=>resp.json());
}

function sendPostRequest(url, body) {
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: headers
    }).then(resp=>resp.json());
}

function sendDeleteRequest(url, id) {
    return fetch(url + `?id=${id}`, {
        method: "DELETE",
        headers: headers
    }).then(resp=>resp.json());
}