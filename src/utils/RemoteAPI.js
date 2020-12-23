export class RemoteAPI {

    constructor() {
        this.url = "https://special.spbarchives.ru";
    }

    get (subUrl) {
        return fetch(this.url + subUrl);
    }

    post(subUrl, body) {
        return fetch(this.url + subUrl, {
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

    openSearchWindow (searchToken) {
        window.open(`https://special.spbarchives.ru/search?query=${searchToken}&advancedSearch=false&from=vk`);
    }

}
