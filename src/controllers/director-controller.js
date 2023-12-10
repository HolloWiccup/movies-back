import { StatusCodes } from "http-status-codes";
import {
	getDirectorById,
	getDirectors,
	createDirector,
	updateDirector,
	deleteDirector,
} from "../services/director-services.js";

const directorController = {
	async getDirectors(_, res) {
		try {
			const directors = await getDirectors();
			res.status(StatusCodes.OK).json(directors);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
		}
	},

	async getDirector(req, res) {
		try {
			const director = await getDirectorById(req.params.id);
			res.status(StatusCodes.OK).json(director);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
		}
	},
	
	async addDirector(req, res) {
		try {
			const director = await createDirector(req.body);
			res.status(StatusCodes.CREATED).json(director);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
		}
	},

	async updateDirector(req, res) {
		try {
			const { id } = req.params;
			const data = req.body;
			const director = await updateDirector(id, data);

			res.status(StatusCodes.ACCEPTED).send();
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
		}
	},

	async deleteDirector(req, res) {
		try {
			const { id } = req.params;
			const director = await deleteDirector(id);

			res.status(StatusCodes.ACCEPTED).send();
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
		}
	},
};

export { directorController };
