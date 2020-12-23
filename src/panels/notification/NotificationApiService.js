import {RemoteAPI} from '../../utils/RemoteAPI';

export class NotificationApiService {

    constructor() {

    }

    async subscribeToNotification(userId, searchQuery) {

        const notification = {
            ...JSON.parse(searchQuery),
            vkUserid: userId
        }

        const api = new RemoteAPI();

        return await api.post('/api/v1/vk/notification/add', notification);
    }
}
