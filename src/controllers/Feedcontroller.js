import {
  errorResponse, successResponseArray
} from '../utiities';
  
import {
  getItems
} from '../database/query/helper';

/**
 * @class FeedController
 * @description Controller to manage feeds
 * @exports FeedController
 */
export default class FeedController {
  /**
  * @method getFeeds
  * @description - method to get all articles
  * @param {object} req - request object
  * @param {object} res - response object
  * @return {object} request response body
  */
  static async getFeeds(req, res) {
    try {
      const { result: gifs } = await getItems('gifs');
      const { result: articles } = await getItems('articles');
      const feeds = [...gifs, ...articles];
      const sorted = feeds.sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());
      return successResponseArray(res, 200, sorted);
    } catch (error) {
        console.log(error, '=====yo niccur')
    //   return errorResponse(res, 500, 'Internal server error');
    }
  }
}
