import {RemoteAPI} from '../../utils/RemoteAPI';

export class NotificationApiService {

    constructor() {

    }

    async subscribeToNotification(vkUserId, searchQuery) {

        const notification = {
            ...JSON.parse(searchQuery),
            vkUserId
        }

        const api = new RemoteAPI();

        return await api.post('/api/v1/vk/notification/add', notification);
    }
}
