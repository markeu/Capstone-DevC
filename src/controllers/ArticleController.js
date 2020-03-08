import {
  errorResponse, successResponse, hashPassword, generateToken, successResponseArray
} from '../utiities';
  
import { createItem, getItem, getItems } from '../database/query/helper';
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
    if (req.files && req.files.image) {
      const file = dataUri(req).content;
      const { image_url: imageUrl } = await uploader.upload(file);
      imgUrl = imageUrl;
    }
    // console.log(req.files);
    // if (req.files && req.files.image) {
    //   const { image } = req.files;
    //   const { secure_url: secureUrl } = await uploadCloudinary(image);
    //   console.log('url:', secureUrl);
    //   imgUrl = secureUrl;
    // }
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
}
