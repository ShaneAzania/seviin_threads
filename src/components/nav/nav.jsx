import { LogoContainer, Navigation, NavLinks, NavLinksContainer } from "./nav.styles.jsx";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { Link, Outlet } from "react-router-dom";
import { Fragment } from "react";

import { signOutUser /*, getUserDisplayNameFromeFireStore */ } from "../../utils/firebase/firebase.utils";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { UserContext } from "../../contexts/user.context";

import CartIcon from "../cart-icon/cart-icon";
import CartDropdown from "../cart-dropdown/cart-dropdown";

function Nav({ links }) {
	const { currenntUser } = useContext(UserContext);
	const { isCartOpen, set_isCartOpen } = useContext(CartContext);

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
		set_isCartOpen(!isCartOpen);
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
