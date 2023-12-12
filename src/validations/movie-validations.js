import { body } from "express-validator";
import { MESSAGE } from "../const/constants.js";
import { validationHandler } from "./validation-handler.js";
import { Movie } from "../models/movie/movie.js";
import { isExistMovie } from "../services/movie-services.js";
import { StatusCodes } from "http-status-codes";

const checkMovieData = [
	body("title").trim().isString().notEmpty().withMessage(MESSAGE.emptyText),
	body("duration").isInt({ min: 1 }).withMessage(MESSAGE.positiveNum),
	body("year").isInt({ min: 1900 }).withMessage(MESSAGE.invalidYear),
	body("category").trim().isMongoId().withMessage(MESSAGE.invalidObjectId),
	body("director").trim().isMongoId().withMessage(MESSAGE.invalidObjectId),
	validationHandler
];

const isExisted = async (req, res, next) => {
	const data = req.body;
	const exist = await isExistMovie(data)
	if(exist) {
		res.status(StatusCodes.CONFLICT).send('Movie is exist')
	}
	next()
}

const checkMoviesUploadData = (movies) => {
	const result = {
		errors: [],
		movies: [] 
	}
	
	if(!movies.length) {
		result.errors.push('Movie list is empty')
		return result
	}

	const movieSchema = Movie.schema.obj;
	const keys = Object.keys(movieSchema);
	const requiredFields = keys.filter((key) => movieSchema[key].required)

	

	movies.forEach((movie) => {
		const movieErrors = {
			movie,
			errors: []
		}
		requiredFields.forEach((field) => {
			if(!movie[field]){
				movieErrors.errors.push(`Отсутствует поле ${field}`)
			}
		})
		movieErrors.errors.length ? result.errors.push(movieErrors) : result.movies.push(movie)
	})

	return result
}

export { checkMovieData, checkMoviesUploadData, isExisted };
