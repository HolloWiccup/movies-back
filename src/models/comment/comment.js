import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
	{
		movie: "ObjectId",
		author: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		date: Date,
	},
	{ versionKey: false }
);

const Comment = model("Comment", CommentSchema);

export { Comment };
