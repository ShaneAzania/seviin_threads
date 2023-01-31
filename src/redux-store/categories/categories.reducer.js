import { CATEGORIES_ACTION_TYPES } from "./categories.types";

const INITIAL_STATE = {
	categories: [
		{
			title: "",
			items: [
				{
					id: 0,
					name: "",
					imageUrl: "",
					price: 0,
				},
			],
		},
	],
};

export const categoriesReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (type) {
		case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
			return {
				...state,
				categories: payload,
			};

		default:
			return state;
	}
};
