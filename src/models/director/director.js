import { Schema, model } from "mongoose";

const DirectorSchema = new Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false }
);

const Director = model("Director", DirectorSchema);

export { Director };
