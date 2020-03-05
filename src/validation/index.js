/* eslint-disable import/prefer-default-export */
import { userRegister, loginUser } from './rules';

export const validationFetch = (validationName) => {
  const rules = {
    userRegister,
    loginUser
  };

  return rules[validationName];
};

export default validationFetch;
