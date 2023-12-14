import { User } from "../models/user/user.js";

const createUser = async (data) => {
	return await User.create(data);
};

const findUser = async (email) => {
	return await User.findOne({ email });
};

export { createUser, findUser };
