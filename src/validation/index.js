/* eslint-disable import/prefer-default-export */
import { userRegister } from './rules';

export const validationFetch = (validationName) => {
  const rules = {
    userRegister
  };

  return rules[validationName];
};

export default validationFetch;
