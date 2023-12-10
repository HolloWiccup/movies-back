import { body, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

export const validator = {
	emptyField(field){
		return body(field).trim().notEmpty().withMessage(MESSAGE.emptyText)
	}
}

export const validationHandler = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ error: errors.array() });
	}
	next()
}
