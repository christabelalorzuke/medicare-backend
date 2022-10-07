import { ResponseError } from "../error_handlers/response_error";

const { generateToken } = require("./json_web_token");
const Users = require("../models/user.model");
const bcrypt = require("bcryptjs");

async function getUser(email, password) {
  try {
    const user = await Users.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (user && isPasswordCorrect) {
      return user;
    } else {
      throw new ResponseError(400, "Invalid email or password!");
    }
  } catch (error) {
    throw error;
  }
}

const issueToken = (id, email) => {
  try {
    const token = generateToken({ id, email });

    if (token) {
      return token;
    } else {
      throw new ResponseError(500, "Failed to generate token.");
    }
  } catch (error) {
    throw error;
  }
};

const verifyUserAndIssueToken = (id, email, password) => {
  try {
    const user = getUser(email, password);
    const token = issueToken(id);

    return {
      user: user,
      token: token,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = verifyUserAndIssueToken;
