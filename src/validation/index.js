/* eslint-disable import/prefer-default-export */
import { userRegister, loginUser, createArticle } from './rules';

export const validationFetch = (validationName) => {
  const rules = {
    userRegister,
    loginUser,
    createArticle
  };

  return rules[validationName];
};

export default validationFetch;
