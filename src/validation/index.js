/* eslint-disable import/prefer-default-export */
import { userRegister, loginUser, createArticle, comment, createGif } from './rules';

export const validationFetch = (validationName) => {
  const rules = {
    userRegister,
    loginUser,
    createArticle,
    comment,
    createGif
  };

  return rules[validationName];
};

export default validationFetch;
