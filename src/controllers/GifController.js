import {
  errorResponse, successResponse, hashPassword, generateToken, successResponseArray
} from '../utiities';
    
import {
  createItem, getItem, getItems, updateItem, deleteItem
} from '../database/query/helper';
import { uploadCloudinary } from '../services';

/**
 * @class UserController
 * @description Controller to manage user actions
 * @exports GifController
 */
export default class gifsController {
/**
  * @method createGif
  * @description - method for users to create gif
  * @param {object} req - request object
  * @param {object} res - response object
  * @return {object} request response body
  */
  static async createGif(req, res) {
    const { title, share } = req.body;
    const { userId: ownerId, firstName, lastName } = req.user;
    if (!req.files || !req.files.image) {
      return errorResponse(res, 400, 'Please provide an Image');
    }
    const { image } = req.files;
    try {
      const { secure_url: secureUrl } = await uploadCloudinary(image);
      const { error, result: newGif } = await createItem('gifs', {
        title,
        ownerId,
        share: share === 'false' ? share : true,
        imageUrl: secureUrl,
        authorName: `${firstName} ${lastName}`
      });
      if (!error) {
        return successResponse(res, 201, 'Gif successfully created', newGif);
      }
      return errorResponse(res, 500, 'Server error');
    } catch (error) {
      return errorResponse(res, 500, 'Internal server error');
    }
  }

  /**
* @method getgif
* @description - method to get all articles
* @param {object} req - request object
* @param {object} res - response object
* @return {object} request response body
*/
  static async getGif(req, res) {
    try {
      const { id } = req.params;
      const { error, result: gifItem } = await getItem('gifs', { id });
      const { result: commentArr } = await getItems('comments', { postId: id });
      if (!error) {
        const response = { ...gifItem, comment: commentArr };
        return successResponse(res, 200, 'Gifs created successfully', response);
      }
      return errorResponse(res, 500, 'Server error');
    } catch (error) {
      return errorResponse(res, 500, 'Internal server error');
    }
  }

  /**
  * @method deleteGif
  * @description - method for users to delete an existing gif
  * @param {object} req - request object
  * @param {object} res - response object
  * @return {object} request response body
  */
  static async deleteGif(req, res) {
    try {
      const { userId } = req.user;
      const { id: gifId } = req.params;
      const { result: gifItem } = await getItem('gifs', { id: gifId });
 
      if (!gifItem) return errorResponse(res, 404, 'Gif not found');
      if (gifItem.ownerId !== userId) {
        return errorResponse(res, 403, 'Not allowed');
      }
      const { result: deleteGif } = await deleteItem('gifs', gifId);
      if (deleteGif) return successResponse(res, 200, 'Gif deleted successfully');
      return errorResponse(res, 500, 'Server error');
    } catch (error) {
      return errorResponse(res, 500, 'Internal server error');
    }
  }

  /**
 * @method commentArticle
 * @description - method for users to comment on a gif
 * @param {object} req - request object
 * @param {object} res - response object
 * @return {object} request response body
 */
  static async commentGif(req, res) {
    const { userId: ownerId, firstName, lastName } = req.user;
    try {
      const { id: gifId } = req.params;
      const { comment } = req.body;
      const { result: gifItem } = await getItem('gifs', { id: gifId });
      if (!gifItem) {
        return errorResponse('gifs', 500, 'Server error');
      }
      const { error, result: newComment } = await createItem('comments', {
        ownerId,
        comment,
        authorName: `${firstName} ${lastName}`,
        postId: gifId
      });
      const response = {
        ...newComment,
        gifTitle: gifItem.title
      };
      if (!error) {
        return successResponse(res, 201, 'Comment created successfully', response);
      }
      throw new Error(error);
    } catch (error) {
      return errorResponse(res, 500, 'Internal Server error');
    }
  }
}
