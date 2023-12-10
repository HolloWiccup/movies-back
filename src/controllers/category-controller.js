import { StatusCodes } from "http-status-codes";
import {
	getCategories,
	getCategoryById,
	createCategory,
	deleteCategory,
	updateCategory
} from "../services/category-services.js";

const categoryController = {
	async getCategories(_, res) {
		try {
			const categories = await getCategories();
			res.status(StatusCodes.OK).json(categories);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
		}
	},

	async getCategory(req, res) {
		try {
			const { id } = req.params;
			const category = await getCategoryById(id);

			res.status(StatusCodes.OK).json(category);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
		}
	},

	async addCategory(req, res) {
		try {
			const data = req.body;
			const category = await createCategory(data);

			res.status(StatusCodes.CREATED).json(category);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
		}
	},

	async updateCategory(req, res) {
		try {
			const { id } = req.params;
			const data = req.body;
			const category = await updateCategory(id, data);

			res.status(StatusCodes.ACCEPTED).send();
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
		}
	},
	
	async deleteCategory(req, res) {
		try {
			const { id } = req.params;
			const category = await deleteCategory(id);

			res.status(StatusCodes.ACCEPTED).send();
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
		}
	},
};

export { categoryController };
