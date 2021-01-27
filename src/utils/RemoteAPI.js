export class RemoteAPI {
    static get (subUrl) {
        return fetch(process.env.REACT_APP_API_URL + subUrl);
    }

    static post(subUrl, body) {
        return fetch(process.env.REACT_APP_API_URL + subUrl, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(body) // body data type must match "Content-Type" header
        })
    }

    static getSearchUrl(searchToken) {
        return `${process.env.REACT_APP_API_URL}/search?query=${searchToken}&advancedSearch=false&from=vk`;
    }

    static openSearchWindow (searchToken) {
        window.open(`${process.env.REACT_APP_API_URL}/search?query=${searchToken}&advancedSearch=false&from=vk`);
    }

}
