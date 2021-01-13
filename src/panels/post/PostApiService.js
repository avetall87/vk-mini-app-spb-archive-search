import {RemoteAPI} from "../../utils/RemoteAPI";

export class PostApiService {
  static async savePostInfo(vkUserId, postId, postMessage, postLink) {
    const postInfo = {
      vkUserId,
      postId,
      postMessage,
      postLink
    };

    return await RemoteAPI.post('/api/v1/vk/post/add', postInfo);
  }
}