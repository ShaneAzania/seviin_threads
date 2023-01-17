import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChangedListener, getUserDisplayNameFromeFireStore } from "../utils/firebase/firebase.utils";

// the actual value you want to access
export const UserContext = createContext({
	currenntUser: null,
	setCurrenntUser: () => null,
});

// Reducer and action types and iniitial state
const USER_ACTION_TYPES = {
	SET_CURRENT_USER: "SET_CURRENT_USER",
};
const userReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return {
				...state,
				currenntUser: payload,
			};
		default:
			throw new Error(`wrong action type: ${type}`);
	}
};
const INITIAL_STATE = { currenntUser: null };

// provider is the actual component that gets wrapped around other components to give them acces to the context
export const UserProvider = ({ children }) => {
	const [{ currenntUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

	const setCurrenntUser = (userToSet) => {
		dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: userToSet });
	};

	const value = { currenntUser, setCurrenntUser };

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener(async (user) => {
			//try to get display name into current user before setCurrentUser
			var userAuthWithDisplayName = null;

			try {
				userAuthWithDisplayName = await getUserDisplayNameFromeFireStore(user);
			} catch (error) {}

			//set current user
			if (user && userAuthWithDisplayName) {
				setCurrenntUser(userAuthWithDisplayName);
			} else if (user && !userAuthWithDisplayName) {
				setCurrenntUser(user);
			} else {
				setCurrenntUser(null);
			}
		});

		return unsubscribe;
	}, []);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
