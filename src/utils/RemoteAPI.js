const url = "https://special.spbarchives.ru";

export class RemoteAPI {
    static get (subUrl) {
        return fetch(url + subUrl);
    }

    static post(subUrl, body) {
        return fetch(url + subUrl, {
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

    static openSearchWindow (searchToken) {
        window.open(`https://special.spbarchives.ru/search?query=${searchToken}&advancedSearch=false&from=vk`);
    }

}
