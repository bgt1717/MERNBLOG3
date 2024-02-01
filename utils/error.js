export const errorHandler = (statusCode, message) => {
    //JS constructor to give custom error message.
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
  };