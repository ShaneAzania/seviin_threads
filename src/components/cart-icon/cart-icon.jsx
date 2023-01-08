import { CartIconContainer, ShoppingIcon, ItemCount } from "./cart-icon.styles.jsx";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

// import { ReactComponent as ShoppingCartIcon } from "../../assets/shopping-bag.svg";

const CartIcon = ({ onClick, children }) => {
	const { cartCount } = useContext(CartContext);

	return (
		<CartIconContainer onClick={onClick}>
			<ShoppingIcon />
			<ItemCount>{cartCount}</ItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;
