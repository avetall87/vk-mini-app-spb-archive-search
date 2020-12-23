export class NotificationApiService {

    constructor() {

    }

    async subscribeToNotification(userId, searchQuery) {

        let notification = {
            userId: userId,
            searchQuery: searchQuery
        }

        // вынести в общий метод POST
        return await fetch('https://special.spbarchives.ru/api/v1/vk/notification/add', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(notification) // body data type must match "Content-Type" header
        })
    }
}
