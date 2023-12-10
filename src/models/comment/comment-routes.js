import { Router } from "express";
import { commentController } from "../../controllers/comment-controller.js";
import { checkCommentData, checkCommentDataPatch } from "../../validations/comment-validations.js";

const router = Router();

router
	.route("*/:movieId/comments/")
	.get(commentController.getCommentsToMovie)
	.post(checkCommentData, commentController.addComment);

router.get("/comments", commentController.getAllComments);

router
	.route("*/comments/:id")
	.get(commentController.getComment)
	.patch(checkCommentDataPatch, commentController.updateComment)
	.delete(commentController.deleteComment);

export { router as commentRouter };
