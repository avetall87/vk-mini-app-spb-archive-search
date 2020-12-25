import bridge from "@vkontakte/vk-bridge";
import _ from "lodash";

export class UserInfoService {

  static getUserInfoPromise() {
    return bridge.send('VKWebAppGetUserInfo');
  }

  static getUserId(userInfo) {
    return _.get(userInfo, 'id');
  }

  static getUserFirstName(userInfo) {
    return _.get(userInfo, 'first_name');
  }

  static getUserLastName(userInfo) {
    return _.get(userInfo, 'last_name');
  }

}