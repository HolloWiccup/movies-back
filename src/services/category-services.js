import { Category } from "../models/category/category.js";

const getCategories = async () => {
	return await Category.find().lean();
};

const getCategoryById = async (id) => {
	return await Category.findById(id).lean();
};

const createCategory = async ({ genre }) => {
	return await Category.create({ genre });
};

const updateCategory = async (id, data) => {
	return await Category.findByIdAndUpdate(id, data);
};

const deleteCategory = async (id) => {
	return await Category.findByIdAndDelete(id);
};

export {
	getCategories,
	getCategoryById,
	createCategory,
	deleteCategory,
	updateCategory,
};
