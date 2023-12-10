import { body } from "express-validator";
import { MESSAGE } from "../const/constants.js";
import { validationHandler } from "./validation-handler.js";

const bodyAthor = body("author")
	.trim()
	.isLength({ min: 2 })
	.withMessage(MESSAGE.shortName);
const bodyText = body("text").trim().notEmpty().withMessage(MESSAGE.emptyText);

const checkCommentData = [bodyAthor, bodyText, validationHandler];

const checkCommentDataPatch = [
	bodyAthor.optional(),
	bodyText.optional(),
	validationHandler,
];

export { checkCommentData, checkCommentDataPatch };
