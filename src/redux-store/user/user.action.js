import { USER_ACTION_TYPES } from "./user.types";

export const setCurrenntUser = (userToSet) => {
	return { type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: userToSet };
};
