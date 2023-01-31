// react
import { createContext, useEffect, useReducer } from "react";

// firebase
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

// the actual value you want to access
export const CategoriesContext = createContext({
	categories: null,
	set_categories: () => null,
});

// Reducer and action types and iniitial state
const CATEGORIES_ACTION_TYPES = {
	SET_CATEGORIES: "SET_CATEGORIES",
};
const categoriesReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
			return {
				...state,
				categories: payload,
			};

		default:
			throw new Error(`wrong action type: ${type}`);
	}
};
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

// provider is the actual component that gets wrapped around other components to give them acces to the context
export const CategoriesProvider = ({ children }) => {
	const [{ categories }, dispatch] = useReducer(categoriesReducer, INITIAL_STATE);

	const set_categories = (categoriesToSet) => {
		dispatch({ type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES, payload: categoriesToSet });
	};

	const value = { categories, set_categories };

	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoriesMap = await getCategoriesAndDocuments("categories");
			set_categories(categoriesMap);
		};
		getCategoriesMap();
	}, []);

	return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
};
