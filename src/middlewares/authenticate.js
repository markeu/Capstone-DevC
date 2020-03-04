/* eslint-disable valid-jsdoc */

import { verifyToken, errorResponse } from '../utiities';

/**
 * @class Authenticate
 * @description authenticate tokens and roles
 * @exports Authenticate
 */
class Authenticate {
  /**
   * Verify if token is valid
   * @param  {object} req - The user request object
   * @param  {object} res - The user res response object
   * @param  {function} next - The next() Function
   * @returns {String} req.userId - The user id
   */
  static async verifyToken(res, req, next) {
    try {
      const { headers: { authorization } } = req;
      if (authorization === undefined) throw new Error('no auth');
      const token = authorization.split(' ')[0];
      if (!token || token === '') {
        return errorResponse(res, 401, 'Access denied');
      }
      const decoded = await verifyToken(token);
      if (!decoded && decoded.userId) {
        return errorResponse(res, 401, 'Access denied. We could not verify user');
      }
      req.user = decoded;
      next();
    } catch (error) {
      if (error.message === 'no auth' || error.message === 'jwt expired') {
        return errorResponse(res, 401, 'Authorisation failed');
      }
      return errorResponse(res, 500, 'Server error');
    }
  }

  /**
  * Verifies a valid root user
  * @param  {object} req - The user request object
  * @param  {object} res - The user res response object
  * @param  {function} next - The next() Function
  * @returns {String} next() if valid secret
  */
  static async verifyRootUser(req, res, next) {
    const { secret } = req.body;
    const savedSecret = process.env.ROOT_USER;
    if (secret === savedSecret) {
      req.body.userRole = 'admin';
      return next();
    }
    return errorResponse(res, 403, 'Not allowed');
  }
}

export default Authenticate;
