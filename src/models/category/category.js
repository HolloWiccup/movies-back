import { Schema, model } from "mongoose";

const CategorySchema = new Schema(
	{
		genre: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false }
);

const Category = model("Category", CategorySchema);

export { Category };
