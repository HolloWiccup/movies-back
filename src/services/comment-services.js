import { Comment } from "../models/comment/comment.js";

const moviePopulate = {
	path: "movie",
	select: {
		_id: 0,
		title: 1,
	},
};

const getComments = async (movieId) => {
	if (!movieId) {
		return await Comment.find().populate(moviePopulate);
	}

	return await Comment.find({ movie: movieId }).populate(moviePopulate);
};

const getCommentById = async (id) => {
	return await Comment.findById(id).lean().populate(moviePopulate);
};

const createComment = async (movieId, data) => {
	return await Comment.create({ ...data, movie: movieId, date: Date.now() });
};

const updateComment = async (id, data) => {
	return await Comment.findByIdAndUpdate(id, data);
};

const deleteComment = async (id) => {
	return await Comment.findByIdAndDelete(id);
};

export {
	getComments,
	getCommentById,
	createComment,
	updateComment,
	deleteComment,
};
