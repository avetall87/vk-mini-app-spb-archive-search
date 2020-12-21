export class NotificationApiService {

    constructor() {

    }

    async subscribeToNotification (userId, searchQuery) {

        let notification = {
            userId: userId,
            searchQuery: searchQuery,
            requestId: 123
        }

        /*  const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'same-origin', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(userNotification) // body data type must match "Content-Type" header
        });

        return await response.json();*/

        console.log(JSON.stringify(notification));

        return "success";
    }
}
