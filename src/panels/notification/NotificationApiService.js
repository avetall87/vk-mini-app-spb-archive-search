import {RemoteAPI} from '../../utils/RemoteAPI';
import _ from 'lodash';

export class NotificationApiService {
  static async subscribeToNotification(vkUserId, searchQuery) {
    const query = JSON.parse(searchQuery);
    _.forEach(
        _.keys(query),
        key => query[key] = decodeURIComponent(query[key]));

    const notification = {
      searchQuery: query,
      vkUserId,
    };

    return await RemoteAPI.post('/api/v1/vk/notification/add', notification);
  }
}
