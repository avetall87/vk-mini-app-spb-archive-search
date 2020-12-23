export class NotificationApiService {

    constructor() {

    }

    async subscribeToNotification(userId, searchQuery) {

        const notification = {
            ...JSON.parse(searchQuery),
            vkUserId
        }

        const api = new RemoteAPI();

        return await api.post('/api/v1/vk/notification/add', notification);
    }
}
