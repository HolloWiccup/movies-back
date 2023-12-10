import { body } from "express-validator";
import { MESSAGE } from "../const/constants.js";
import { validationHandler } from "./validation-handler.js";

const checkDirectorData = [
	body("fullName").trim().isLength({ min: 2 }).withMessage(MESSAGE.shortName),
	validationHandler,
];

export { checkDirectorData };
