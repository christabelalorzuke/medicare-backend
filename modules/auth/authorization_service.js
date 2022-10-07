import { ResponseError } from "../error_handlers/response_error";

const { verifyToken } = require("./json_web_token");
const responseObject = require("../models/response_object");

const authorizeRequest = (request, response, next) => {
  try {
    const authorizationRequestHeader = request.header.authorization;
    if (!authorizationRequestHeader) {
      throw new ResponseError(403, "Something wrong with the request, check the authorization header!");
    }

    const tokenFromRequest = authorizationRequestHeader.split("")[1];
    if (!tokenFromRequest) {
      throw new ResponseError(403, "Request failed, please login.");
    }

    const authorizedUser = verifyToken(tokenFromRequest);

    request.user = authorizedUser;

    next();
  } catch (error) {
    const isResponseError = error instanceof ResponseError;
    if (isResponseError) {
        response.status(error.responseStatus).json(responseObject(null, false, error.message));
    } else {
        response.status(500).json(responseObject(null, false, "Failed to authorize request."));
    }
  }
};

module.exports = authorizeRequest;
