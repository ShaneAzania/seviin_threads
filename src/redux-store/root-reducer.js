import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/categories.reducer";
import { cartReducer } from "./cart/cart.reducer";

export const rootReducer = combineReducers({
	cart: cartReducer,
	categories: categoriesReducer,
	user: userReducer,
});
