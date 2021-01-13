import {RemoteAPI} from '../../utils/RemoteAPI';
import _ from 'lodash';

export class NotificationApiService {
  static async subscribeToNotification(vkUserId, searchQuery) {
    const query = JSON.parse(searchQuery);
    _.forEach(
        _.keys(query),
        key => query[key] = decodeURIComponent(query[key]));

    const notification = {
      searchCondition: query,
      value: vkUserId,
      type: 'VK'
    };

    return await RemoteAPI.post('/api/v1/notification/add', notification);
  }
}
