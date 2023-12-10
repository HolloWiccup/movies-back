import { Router } from "express";
import { categoryController } from "../../controllers/category-controller.js";
import { checkCategoryData } from "../../validations/category-validations.js";

const router = Router();

router
	.route("/categories")
	.get(categoryController.getCategories)
	.post(checkCategoryData, categoryController.addCategory);

router
	.route("/categories/:id")
	.get(categoryController.getCategory)
	.patch(checkCategoryData, categoryController.updateCategory)
	.delete(categoryController.deleteCategory);

export { router as categoryRouter };
