import { findUser, createUser } from "../services/user-service.js";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { MESSAGE } from "../const/constants.js";

const userController = {
	async addUser(req, res) {
		try {
			const { email, password } = req.body;
			const token = jwt.sign({ email, password }, process.env.JWT_SECRET);
			await createUser({ email, token });

			res.status(StatusCodes.CREATED).send();
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
		}
	},

	async authUser(req, res) {
		try {
			const { email, password } = req.body;
			const user = await findUser(email);

			if (!user) {
				res.status(StatusCodes.BAD_REQUEST).send(MESSAGE.notFoundUser);
			}

			const { token } = user;
			const userInfo = jwt.decode(token, process.env.JWT_SECRET);

			if (userInfo.password !== password) {
				res.status(StatusCodes.BAD_REQUEST).send(MESSAGE.incorrectPassword);
			}

			res.status(StatusCodes.OK).send(token);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
		}
	},
};

export { userController };
