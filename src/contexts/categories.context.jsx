import { createContext, useEffect, useState } from "react";
import {} from "../utils/firebase/firebase.utils";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

// the actual value you want to access
export const CategoriesContext = createContext({
	categories: null,
	set_categories: () => null,
	products: [],
	setProducts: () => null,
});

// provider is the actual component that gets wrapped around other components to give them acces to the context
export const CategoriesProvider = ({ children }) => {
	const [categories, set_categories] = useState([
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
	]);
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
