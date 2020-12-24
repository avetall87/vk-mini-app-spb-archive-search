import {RemoteAPI} from '../../utils/RemoteAPI';
import _ from 'lodash';

export class NotificationApiService {

  constructor() {

  }

  async subscribeToNotification(vkUserId, searchQuery) {
    const query = JSON.parse(searchQuery);
    _.forEach(
        _.keys(query),
        key => query[key] = decodeURIComponent(query[key]));

    const notification = {
      ...query,
      vkUserId,
    };

    const api = new RemoteAPI();

    return await api.post('/api/v1/vk/notification/add', notification);
  }
}
