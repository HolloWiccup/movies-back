import { StatusCodes } from "http-status-codes";
import {
	getMovies,
	getMovieById,
	createMovie,
	createMovies,
} from "../services/movie-services.js";
import { uploadJsonFile } from "../utils/upload-json.js";
import { FILENAME } from "../const/constants.js";
import { checkMoviesUploadData } from "../validations/movie-validations.js";

const movieController = {
	async getMovies(_, res) {
		try {
			const movies = await getMovies();
			res.status(StatusCodes.OK).json(movies);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
		}
	},

	async getMovie(req, res) {
		try {
			const { id } = req.params;
			const movie = await getMovieById(id);
			res.status(StatusCodes.OK).json(movie);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
		}
	},

	async addMovie(req, res) {
		try {
			const data = req.body;
			const movie = await createMovie(data);

			res.status(StatusCodes.CREATED).json(movie);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
		}
	},

	async updateMovie(req, res) {
		try {
			const { id } = req.params;
			const data = req.body;
			const movie = await updateMovie(id, data);

			res.status(StatusCodes.ACCEPTED).send();
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
		}
	},

	async deleteMovie(req, res) {
		try {
			const { id } = req.params;
			const movie = await deleteMovie(id);

			res.status(StatusCodes.ACCEPTED).send();
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
		}
	},
	async uploadMoviesFromFile(_, res) {
		try {
			const data = await uploadJsonFile(FILENAME.movies);
			const { errors, movies } = checkMoviesUploadData(data);

			if (errors.length) {
				return res.status(StatusCodes.CONFLICT).json(errors);
			}

			await createMovies(movies);

			res.status(StatusCodes.CREATED).send();
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
		}
	},
};

export { movieController };
