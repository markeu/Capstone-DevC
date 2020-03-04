// eslint-disable-next-line import/prefer-default-export
export const getColumns = (data) => {
  let columns = '';
  try {
    data.forEach((_, index) => {
      if (index >= data.length - 1) {
        columns += `$${index + 1}`;
      } else {
        columns += `$${index + 1}`;
      }
    });
  } catch (error) {
    return error.message;
  }

  return columns;
};

