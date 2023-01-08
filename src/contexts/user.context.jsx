import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, getUserDisplayNameFromeFireStore } from "../utils/firebase/firebase.utils";

// the actual value you want to access
export const UserContext = createContext({
	currenntUser: null,
	setCurrenntUser: () => null,
});

// provider is the actual component that gets wrapped around other components to give them acces to the context
export const UserProvider = ({ children }) => {
	const [currenntUser, setCurrenntUser] = useState(null);
	const value = { currenntUser, setCurrenntUser };

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener(async (user) => {
			//try to get display name into current user before setCurrentUser
			var userAuthWithDisplayName = null;

			try {
				userAuthWithDisplayName = await getUserDisplayNameFromeFireStore(user);
				// console.log(
				// 	"userContext: onAuthStateChangedListener: try: userAuthWithDisplayName:",
				// 	userAuthWithDisplayName
				// );
			} catch (error) {
				// console.log("userContext: onAuthStateChangedListener: catch: user:", user);
				// console.log("userContext:", error);
			}

			//set current user
			if (user && userAuthWithDisplayName) {
				// console.log(
				// 	"userContext: onAuthStateChangedListener: if/else: userAuthWithDisplayName:",
				// 	userAuthWithDisplayName
				// );
				setCurrenntUser(userAuthWithDisplayName);
			} else if (user && !userAuthWithDisplayName) {
				// console.log("userContext: onAuthStateChangedListener: if/else: user:", user);
				setCurrenntUser(user);
			} else {
				setCurrenntUser(null);
			}
		});

		return unsubscribe;
	}, []);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
