import { LogoContainer, Navigation, NavLinks, NavLinksContainer } from "./nav.styles.jsx";
import { ReactComponent as Logo } from "../../assets/crown.svg";

// react
import { Outlet } from "react-router-dom";
import { Fragment } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";

// redux actions
import { set_isCartOpen } from "../../redux-store/cart/cart.action.js";

// redux selectors
import { cart_selector } from "../../redux-store/cart/cart.selector.js";
import { user_selector } from "../../redux-store/user/user.selector.js";

// firebase
import { signOutUser /*, getUserDisplayNameFromeFireStore */ } from "../../utils/firebase/firebase.utils";

// context
// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";
// import { UserContext } from "../../contexts/user.context";

import CartIcon from "../cart-icon/cart-icon";
import CartDropdown from "../cart-dropdown/cart-dropdown";

function Nav({ links }) {
	// const { currenntUser } = useContext(UserContext);
	// const { isCartOpen, set_isCartOpen } = useContext(CartContext);

	// redux dispatch
	const dispatch = useDispatch();

	// redux select state
	const { currenntUser } = useSelector(user_selector);
	const { isCartOpen } = useSelector(cart_selector);

	// var userWithDisplayName;

	const getUsersDisplayName = async () => {
		if (!currenntUser) {
		} //else userWithDisplayName = await getUserDisplayNameFromeFireStore(currenntUser);
	};
	getUsersDisplayName();

	// console.log("nav: userWithDisplayName:", userWithDisplayName);

	let userDisplayName = "";

	try {
		userDisplayName = !currenntUser.displayName ? currenntUser.email : currenntUser.displayName;
	} catch (error) {}

	const handleSignOutClick = async (e) => {
		await signOutUser();
	};
	const handleCartIconClick = (e) => {
		dispatch(set_isCartOpen(!isCartOpen))
	};

	return (
		<Fragment>
			<Navigation>
				<LogoContainer to="/">
					<Logo className="logo" />
				</LogoContainer>
				<NavLinksContainer>
					{links.map(({ text, to }) => {
						if (!currenntUser && text !== "Sign-Out") {
							return (
								<NavLinks key={to} to={to}>
									{text}
								</NavLinks>
							);
						} else if (currenntUser && text !== "Sign-In") {
							if (text === "Sign-Out") {
								return (
									<NavLinks key={to} to={to} onClick={handleSignOutClick}>
										{text}
									</NavLinks>
								);
							} else {
								return (
									<NavLinks key={to} to={to}>
										{text}
									</NavLinks>
								);
							}
						} else return null;
					})}
					<NavLinks key="userDisplayName" to="#">
						{userDisplayName}
					</NavLinks>
					<CartIcon onClick={handleCartIconClick} />
					{isCartOpen ? <CartDropdown /> : null}
				</NavLinksContainer>
			</Navigation>
			<Outlet />
		</Fragment>
	);
}

export default Nav;
