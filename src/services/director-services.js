import { Director } from "../models/director/director.js";

const getDirectors = async () => {
	return await Director.find().lean();
};

const getDirectorById = async (id) => {
	return await Director.findById(id).lean();
};

const createDirector = async (data) => {
	return await Director.create(data);
};

const updateDirector = async (id, data) => {
	return await Director.findByIdAndUpdate(id, data);
};

const deleteDirector = async (id) => {
	return await Director.findByIdAndDelete(id);
};

export {
	getDirectors,
	getDirectorById,
	createDirector,
	updateDirector,
	deleteDirector,
};
