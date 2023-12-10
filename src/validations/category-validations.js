import { body } from "express-validator";
import { MESSAGE } from "../const/constants.js";
import { validationHandler } from "./validation-handler.js";

const checkCategoryData = [
	body("genre").trim().notEmpty().withMessage(MESSAGE.emptyText),
	validationHandler
];

export { checkCategoryData };
