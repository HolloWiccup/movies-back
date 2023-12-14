import { StatusCodes } from "http-status-codes";
import NodeCache from "node-cache";
import {
	getMovieList,
	getMovieById,
	createMovie,
	createMovies,
} from "../services/movie-services.js";
import { uploadJsonFile } from "../utils/upload-json.js";
import { FILENAME } from "../const/constants.js";
import { checkMoviesUploadData } from "../validations/movie-validations.js";

const movieCache = new NodeCache();
const MOVIE_CACHE_KEY = "moviesCacheKey";
const resetMovieCache = () => movieCache.del(MOVIE_CACHE_KEY);

const movieController = {
	async getMovies(req, res) {
		try {
			const { query } = req;
			if (query.params?.length) {
				return res.status(StatusCodes.OK).json(await getMovieList(query));
			}
			
			if (movieCache.has(MOVIE_CACHE_KEY)) {
				return res.status(StatusCodes.OK).json(movieCache.get(MOVIE_CACHE_KEY));
			}
			
			const movies = await getMovieList(query)
			movieCache.set(MOVIE_CACHE_KEY, movies, 1200)

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

			resetMovieCache();
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

			resetMovieCache();
			res.status(StatusCodes.ACCEPTED).send();
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
		}
	},

	async deleteMovie(req, res) {
		try {
			const { id } = req.params;
			const movie = await deleteMovie(id);

			resetMovieCache();
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
			resetMovieCache();
			res.status(StatusCodes.CREATED).send();
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
		}
	},
};

export { movieController };
