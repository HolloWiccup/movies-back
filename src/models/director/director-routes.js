import { Router } from "express";
import { directorController } from "../../controllers/director-controller.js";
import { checkDirectorData } from "../../validations/director-validation.js";

const router = Router();

router
	.route("/directors")
	.get(directorController.getDirectors)
	.post(checkDirectorData, directorController.addDirector);

router
	.route("/directors/:id")
	.get(directorController.getDirector)
	.patch(checkDirectorData, directorController.updateDirector)
	.delete(directorController.deleteDirector);

export { router as directorRouter };
