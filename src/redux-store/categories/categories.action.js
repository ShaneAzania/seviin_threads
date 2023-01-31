import { CATEGORIES_ACTION_TYPES } from "./categories.types";

export const set_categories = (categoriesToSet) => {
	return { type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES, payload: categoriesToSet };
};
