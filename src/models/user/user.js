import { Schema, model } from "mongoose";

const UserSchema = new Schema(
	{
		username: String,
		email: {
			type: String,
			required: true,
		},
		token: {
			type: String,
			required: true,
		},
		roles: [String],
	},
	{ versionKey: false }
);

const User = model("User", UserSchema);

export { User };
