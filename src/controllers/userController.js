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
 * @method getUsers
 * @description - method for admin to get all users
 * @param {object} req - request object
 * @param {object} res - response object
 * @return {object} request response body
 */
  static async getUsers(req, res) {
    try {
      const { error, result: users } = await getItems('users');
      if (error) {
        return errorResponse(res, 500, 'Server error');
      }
      const deletePasswords = users.map((user) => {
        delete user.password;
        return user;
      });
      return successResponseArray(res, 200, deletePasswords);
    } catch (error) {
      return errorResponse(res, 500, 'Server error');
    }
  }

  /**
   * @method registerUser
   * @description - method for admin/root to register a new user
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} request response body
   */
  static async registerUser(req, res) {
    const {
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

  /**
   * @method loginUser
   * @description - method for users to login
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} request response body
   */
  static async loginUser(req, res) {
    const { email, password } = req.body;
    try {
      const { result: user } = await getItem('users', { email });
      if (user) {
        const {
          id, firstName, lastName, password: userPassword
        } = user;
        const confirmPassword = comparePassword(userPassword, password);
        if (!confirmPassword) {
          return errorResponse(res, 401, 'Authorization failed');
        }
        const token = await generateToken({ userId: id, firstName, lastName });
        const data = { userId: id, token };
        return successResponse(res, 200, 'success', data);
      }
      return errorResponse(res, 401, 'Authorization failed');
    } catch (error) {
      return errorResponse(res, 500, 'Server error');
    }
  }
}
