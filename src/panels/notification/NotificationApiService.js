export class NotificationApiService {

    constructor() {

    }

    async subscribeToNotification (userId, searchQuery) {

        let notification = {
            userId: userId,
            searchQuery: searchQuery,
            requestId: 123
        }

        const url = 'https://special.spbarchives.ru/api/v1/vk/notification/add'
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            // mode: 'same-origin', // no-cors, *cors, same-origin
            // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: notification // body data type must match "Content-Type" header
        });

        if (response.ok) { // если HTTP-статус в диапазоне 200-299
                           // получаем тело ответа (см. про этот метод ниже)
            return await response.json();
        } else {
            alert("Ошибка HTTP: " + response.status);
            return null;
        }

        // console.log(JSON.stringify(notification));

        // return "success";
    }
}
