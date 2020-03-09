import {
  errorResponse, successResponse, hashPassword, generateToken, successResponseArray
} from '../utiities';
  
import {
  createItem, getItem, getItems, updateItem, deleteItem
} from '../database/query/helper';
import { dataUri } from '../config/MulterUpload';
// import { uploadCloudinary } from '../services';
import { uploader } from '../config/CloudinaryConfig';

/**
 * @class ArticleController
 * @description Controller to manage article CRUD
 * @exports ArticleController
 */
export default class ArticleController {
/**
 * @method createArticle
 * @description - method for users to create article
 * @param {object} req - request object
 * @param {object} res - response object
 * @return {object} request response body
 */
  static async createArticle(req, res) {
    const {
      title, article, id, share
    } = req.body;
  
    const { userId: ownerId, firstName, lastName } = req.user;
    
    let imgUrl;
    // if (!(req.files && req.files.image)) {
    //   const file = dataUri(req).content;
    //   const { image_url: imageUrl } = await uploader.upload(file);
    //   imgUrl = imageUrl;
    // }
    // console.log(req.files);
    if (req.files && req.files.image) {
      const { image } = req.files;
      const { secure_url: secureUrl } = await uploadCloudinary(image);
      console.log('url:', secureUrl);
      imgUrl = secureUrl;
    }
    try {
      const { error, result: newArticle } = await createItem('articles', {
        id,
        title,
        ownerId,
        share: share === 'false' ? share : true,
        coverImageUrl: imgUrl || 'none',
        article,
        authorName: `${firstName} ${lastName}`,
      });
      if (!error) {
        return successResponse(res, 201, 'Article succesfully created', newArticle);
      }
      throw new Error('Server error');
    } catch (error) {
      return errorResponse(res, 500, 'Internal Server Error');
    }
  }

  /**
 * @method editArticle
 * @description - method for users to edit their article
 * @param {object} req - request object
 * @param {object} res - response object
 * @return {object} request response body
 */
  static async editArticle(req, res) {
    const {
      title, article, share
    } = req.body;
    const { userId: ownerId, firstName, lastName } = req.user;
    const { id: articleId } = req.params;

    try {
      const { result: articleItem } = await getItem('articles', { id: articleId });
      if (!articleItem) return errorResponse(res, 404, 'Not found');
      if (articleItem.ownerId !== ownerId) return errorResponse(res, 404, 'Request not allowed');
      
      let imgUrl;
      if (req.files && req.files.image) {
        const file = dataUri(req).content;
        const { image_url: imageUrl } = await uploader.upload(file);
        imgUrl = imageUrl;
      }
     
      const { error, result: existingArticle } = await updateItem('articles', articleId, {
        id: articleItem.id,
        title: title || articleItem.title,
        ownerId,
        share: share === 'false' ? share : true,
        coverImageUrl: imgUrl || articleItem.coverImageUrl,
        article: article || articleItem.article,
        authorName: `${firstName} ${lastName}`,
      });
     
      if (!error) {
        return successResponse(res, 200, 'Article succesfully updated', existingArticle);
      }
      return errorResponse(res, 500, 'Server error');
    } catch (error) {
      return errorResponse(res, 500, 'Internal server error');
    }
  }

  /**
  * @method deleteArticle
  * @description - method for users to delete an existing article
  * @param {object} req - request object
  * @param {object} res - response object
  * @return {object} request response body
  */
  static async deleteItem(req, res) {
    try {
      const { userId } = req.user;
      const { id: articleId } = req.params;

      const { result: articleItem } = await getItem('articles', { id: articleId });
      if (!articleItem) return errorResponse(res, 404, 'Article not found');
      if (articleItem.ownerId !== userId) {
        return errorResponse(res, 403, 'Not allowed');
      }

      const { result: deleted } = await deleteItem('articles', articleId);
      if (deleted) return successResponse(res, 200, 'Article succesfully deleted');
      return errorResponse(res, 500, 'Server error deleting article');
    } catch (error) {
      return errorResponse(res, 500, 'Internal server error');
    }
  }
  
}
