import { Director } from "../models/director/director.js";
import { Movie } from "../models/movie/movie.js";

const defaultAnswer = { count: 0 };

const getCountMovieByDirector = async (fullName) => {
	const director = await Director.findOne({ fullName });

	if (!director) {
		return defaultAnswer;
	}

	const result = await Movie.aggregate([
		{
			$match: {
				director: director._id,
			},
		},
		{
			$count: "count",
		},
	]);
	return result.length ? result : defaultAnswer;
};

const getCountMovieRangeYear = async (start, end) => {
	if (!start || !end) {
		return defaultAnswer;
	}
	const count = await Movie.aggregate([
		{
			$match: {
				year: {
					$gte: start,
					$lte: end,
				},
			},
		},
		{
			$count: "count",
		},
	]);
	return count;
};

export { getCountMovieByDirector, getCountMovieRangeYear };
