const { Schema, model } = require("mongoose");
const baseUserModel = require("./user.model");

// List of available health services
const healthServices = require("./health_services");
const defaultService = healthServices["generalHealth"];

const doctor = new Schema({
  __proto__: baseUserModel,
  services: {
    type: [String],
    required: true,
    default: [defaultService],
  },
  institution: String,
  certifications: [String],
  medicalCouncilRegistrationNumber: {
    type: String,
    required: true,
  },
  yearsOfExperience: {
    type: Number,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    required: true,
  },
  timeSlot: {
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
  },
  reviews: {
    type: [
      new Schema({
        patientId: {
          type: Schema.Types.ObjectId,
          ref: "Patient",
          required: true,
        },
        reviewMessage: {
          type: String,
          required: true,
        },
      }),
    ],
  },
});

module.exports = model("Doctor", doctor);
