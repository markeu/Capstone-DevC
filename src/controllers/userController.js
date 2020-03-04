import { exists } from 'fs';
import {
  errorResponse, successResponse, hashPassword, generateToken, successResponseArray
} from '../utiities';
import { createItem, getItem, getItems } from '../database/query/helper';
import { comparePassword } from '../utiities/bcrypt';

/**
 * @class UserController
 * @description Controller to manage user actions
 * @exports UserController
 */
export default class UserController {
/**
   * @method registerUser
   * @description - method for admin/root to register a new user
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} request response body
   */
  static async registerUser(req, res) {
    const {
      id,
      firstName,
      lastName,
      email,
      password,
      gender,
      secret,
      jobRole,
      department,
      address,
      userRole,
      avaterUrl,
    } = req.body;

    // verify if user exists
    try {
      const { result } = await getItem('users', { email });
      if (result) {
        return errorResponse(res, 409, 'user already exists');
      }
      
      const { error: createError, result: newUser } = await createItem('users', {
        id,
        firstName,
        lastName,
        password: password ? hashPassword(password) : undefined,
        email,
        gender,
        jobRole,
        secret,
        department,
        address,
        userRole: userRole ? userRole.toLowerCase() : 'employee',
        avaterUrl: avaterUrl || 'none',
      });
      
      if (createError) {
        throw new Error(createError);
      }

      const { password: ignored, ...rest } = newUser;
      const token = await generateToken({ userId: rest.id, firstName, lastName });
      const response = {
        ...rest,
        userId: rest.id,
        token
      };
      successResponse(res, 201, 'User account created succesfully', response);
    } catch (error) {
      return errorResponse(res, 500, 'Server error');
    }
  }
}
