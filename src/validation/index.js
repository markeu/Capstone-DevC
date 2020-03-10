/* eslint-disable import/prefer-default-export */
import { userRegister, loginUser, createArticle, comment } from './rules';

export const validationFetch = (validationName) => {
  const rules = {
    userRegister,
    loginUser,
    createArticle,
    comment
  };

  return rules[validationName];
};

export default validationFetch;
