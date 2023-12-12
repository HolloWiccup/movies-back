import { Router } from "express";
import { movieController } from "../../controllers/movie-controller.js";
import { checkMovieData, isExisted } from "../../validations/movie-validations.js";

const router = Router();

router.get("/movies/upload", movieController.uploadMoviesFromFile)

router
	.route("/movies/:id")
	.get(movieController.getMovie)
	.patch(movieController.updateMovie)
	.delete(movieController.deleteMovie);

router
	.route("/movies")
	.get(movieController.getMovies)
	.post(checkMovieData, isExisted ,movieController.addMovie);




export { router as movieRouter };
