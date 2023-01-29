// css
import "./App.scss";
import "bootstrap";

// fire base
import { onAuthStateChangedListener, getUserDisplayNameFromeFireStore } from "./utils/firebase/firebase.utils";

// react
import { Routes, Route /*, useLocation*/ } from "react-router-dom";
import { useEffect } from "react";
// redux
import { useDispatch } from "react-redux";
//redux actions
import { setCurrenntUser } from "./redux-store/user/user.action";

// componenets
import Nav from "./components/nav/nav";

// routes
import Home from "./routes/home/home.route";
import Shop from "./routes/shop/shop.route";
import SignInUp from "./routes/sign-in-up/sign-in-up.route";
import Checkout from "./routes/checkout/checkout.route";

function App() {
	// console.log("Current URL:".toUpperCase(), useLocation());

	const navLinks = [
		{
			text: "Home",
			to: "/",
		},
		{
			text: "Shop",
			to: "/shop",
		},
		{
			text: "Sign-In",
			to: "/sign-in-up",
		},
		{
			text: "Sign-Out",
			to: "#",
		},
	];

	//redux dispatch
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener(async (user) => {
			//try to get display name into current user before setCurrentUser
			var userAuthWithDisplayName = null;

			try {
				userAuthWithDisplayName = await getUserDisplayNameFromeFireStore(user);
			} catch (error) {}

			//set current user
			if (user && userAuthWithDisplayName) {
				dispatch(setCurrenntUser(userAuthWithDisplayName));
			} else if (user && !userAuthWithDisplayName) {
				dispatch(setCurrenntUser(user));
			} else {
				dispatch(setCurrenntUser(null));
			}
		});

		return unsubscribe;
	}, [dispatch]);

	return (
		<Routes>
			<Route path="/" element={<Nav links={navLinks} />}>
				<Route index element={<Home />} />
				<Route path="shop" element={<Shop />} />
				<Route exact path="shop/:categoryTitle" element={<Shop />} />
				<Route path="sign-in-up" element={<SignInUp />} />
				<Route path="sign-out" element={<SignInUp />} />
				<Route path="checkout" element={<Checkout />} />
			</Route>
		</Routes>
	);
}

export default App;

//           <Route path="*" element={<NoPage />} />
