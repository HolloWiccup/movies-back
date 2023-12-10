import { Schema, model } from "mongoose";

const MovieSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		director: {
			type: "ObjectId",
			ref: "Director",
			required: true,
		},
		year: {
			type: Number,
			required: true,
		},
		category: [
			{
				type: "ObjectId",
				ref: "Category",
			},
		],
		duration: Number,
	},
	{ versionKey: false }
);

const Movie = model("Movie", MovieSchema);

export { Movie };
