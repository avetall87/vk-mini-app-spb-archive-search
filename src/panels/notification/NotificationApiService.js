import {RemoteAPI} from '../../utils/RemoteAPI';

export class NotificationApiService {

    constructor() {

    }

    async subscribeToNotification(userId, searchQuery) {

        const notification = {
            userId: userId,
            searchQuery: searchQuery
        }

        const api = new RemoteAPI();

        return await api.post('/api/v1/vk/notification/add', notification);
    }
}
