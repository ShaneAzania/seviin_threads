import { CartIconContainer, ShoppingIcon, ItemCount } from "./cart-icon.styles.jsx";

//redux
import { useSelector } from "react-redux";
// redux selector
import { cart_selector } from "../../redux-store/cart/cart.selector.js";

//context
// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";

// import { ReactComponent as ShoppingCartIcon } from "../../assets/shopping-bag.svg";

const CartIcon = ({ onClick, children }) => {
	const { cartCount } = useSelector(cart_selector);

	return (
		<CartIconContainer onClick={onClick}>
			<ShoppingIcon />
			<ItemCount>{cartCount}</ItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;
