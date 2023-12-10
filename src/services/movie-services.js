import { Movie } from "../models/movie/movie.js";
import { filterSortService } from "./filter-service.js";

const moviePopulate = ["director", "category"];

const getMovies = async () => {
	const sort = {
		field: "year",
		direction: "1",
	};
	filterSortService(sort, Movie);
	// const query = Movie.find().lean().populate(moviePopulate);
	// query.where('year', 1999)
	query.sort({ title: 1 });
	return query.exec();
	// return await Movie.find().lean().populate(moviePopulate);
};

const getMovieById = async (id) => {
	return await Movie.findById(id).lean().populate(moviePopulate);
};

const createMovie = async ({
	title,
	director,
	year,
	category = [],
	duration = 0,
}) => {
	return await Movie.create({ title, director, year, category, duration });
};

const createMovies = async (movies) => {
	const moviesToDb = movies.map((movie) => {
		new Movie(movie);
	});
	Movie.insertMany(moviesToDb)
};

const updateMovie = async (id, data) => {
	return await Movie.findByIdAndUpdate(id, data);
};

const deleteMovie = async (id) => {
	return await Movie.findByIdAndDelete(id);
};

export {
	getMovies,
	getMovieById,
	createMovie,
	updateMovie,
	deleteMovie,
	createMovies,
};
