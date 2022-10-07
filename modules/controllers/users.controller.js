import { ResponseError } from "../error_handlers/response_error";

const Doctor = require("../models/doctor.model");
const Patient = require("../models/patient.model");
const bcrypt = require("bcryptjs");
const responseObject = require("../models/response_object");
const verifyUserAndIssueToken = require("../auth/authentication_service");

const typeOfUsers = {
  doctor: "doctor",
  patient: "patient",
};

const register = async (request, response) => {
  try {
    const { email, password, typeOfUser } = request.body;

    let emailExists = undefined;
    if (typeOfUser === typeOfUsers.doctor) {
      emailExists = await Doctor.findOne({ email });
    } else if (typeOfUser == typeOfUsers.patient) {
      emailExists = await Patient.findOne({ email });
    }

    //does email already exist
    if (emailExists) {
      return res
        .status(400)
        .json(responseObject(null, false, "Email already in use."));
    }

    userObjectToReturn = {
      email: email,
      password: password,
      typeOfUser: typeOfUser,
    };

    response
      .status(200)
      .json(responseObject(userObjectToReturn, true, "Sign up sucessful."));
  } catch (error) {
    const isResponseError = error instanceof ResponseError;
    if (isResponseError) {
      response
        .status(error.responseStatus)
        .json(responseObject(null, false, error.message));
    } else {
      response
        .status(500)
        .json(responseObject(null, false, "Failed to sign up."));
    }
  }
};

const login = async (request, response) => {
  try {
    const { email, password, typeOfUser } = request.body;

    let user = undefined;
    if (typeOfUser === typeOfUsers.doctor) {
      user = await Doctor.findOne({ email });
    } else if (typeOfUser === typeOfUsers.patient) {
      user = await Patient.findOne({ email });
    }

    if (!user) {
      return res
        .status(400)
        .json(responseObject(null, false, "Invalid credentials"));
    }

    const userAndTokenObject = verifyUserAndIssueToken(user._id, email, password);

    response
      .status(200)
      .json(responseObject(userAndTokenObject, true, "Login sucessful."));
  } catch (error) {
    const isResponseError = error instanceof ResponseError;
    if (isResponseError) {
      response
        .status(error.responseStatus)
        .json(responseObject(null, false, error.message));
    } else {
      response
        .status(500)
        .json(responseObject(null, false, "Failed to login."));
    }
  }
};

const create = async (request, response) => {
  try {
    const {email, password } = request.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const newlyCreatedUser = await Users.create({ ...req.body, password: hashedPassword });

    const userAndToken = verifyUserAndIssueToken(newlyCreatedUser._id, email, password);

    response.status(201).json(responseObject(userAndToken, true, "User successfully created."));
  } catch (error) {
    response
        .status(500)
        .json(responseObject(null, false, "Failed to create user."));
  }
};
