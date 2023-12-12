import { Movie } from '../models/movie/movie.js';
import { filterSortService } from './filter-service.js';

const moviePopulate = ['director', 'category'];

const getMovies = async ({title, year, sort}) => {
  const query = Movie.find().populate(moviePopulate);

  if(title) query.where('title', title)
  if(year) query.where('year', year)
  if(sort) query.sort(sort)

  return query.exec();
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
  const moviesToDb = movies.map((movie) => new Movie(movie));
  return await Movie.insertMany(moviesToDb);
};

const updateMovie = async (id, data) => {
  return await Movie.findByIdAndUpdate(id, data);
};

const deleteMovie = async (id) => {
  return await Movie.findByIdAndDelete(id);
};

const isExistMovie = async ({ title, year }) => {
  const result = await Movie.aggregate([
    {
      $match: {
        title,
        year,
      },
    },
  ]);
  return Boolean(result.length);
};

export {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  createMovies,
  isExistMovie,
};
