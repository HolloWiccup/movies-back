import { StatusCodes } from "http-status-codes";
import {
	getComments,
	getCommentById,
	createComment,
	updateComment,
	deleteComment,
} from "../services/comment-services.js";

const commentController = {
	async getAllComments(_, res) {
		try {
			const comments = await getComments();
			res.status(StatusCodes.OK).json(comments);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
		}
	},

	async getCommentsToMovie(req, res) {
		try {
			const { movieId } = req.params;
			const comments = await getComments(movieId);
			res.status(StatusCodes.OK).json(comments);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
		}
	},

	async getComment(req, res) {
		try {
			const comment = await getCommentById(req.params.id);
			res.status(StatusCodes.OK).json(comment);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
		}
	},

	async addComment(req, res) {
		try {
			const { id } = req.params;
			const data = req.body;
			const comment = await createComment(id, data);

			res.status(StatusCodes.CREATED).json(comment);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
		}
	},

	async updateComment(req, res) {
		try {
			const { id } = req.params;
			const data = req.body;
			const comment = await updateComment(id, data);

			res.status(StatusCodes.ACCEPTED).send();
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
		}
	},
	
	async deleteComment(req, res) {
		try {
			const { id } = req.params;
			const comment = await deleteComment(id);

			res.status(StatusCodes.ACCEPTED).send();
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
		}
	},
};

export { commentController };
