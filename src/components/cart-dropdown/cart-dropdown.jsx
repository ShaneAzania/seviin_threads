// import "./cart-dropdown-styles";
import { CartDropdownContainer, CartItems } from "./cart-dropdown.styles";

import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context";

import CartItem from "../cart-item/cart-item";

const CartDropdown = () => {
	const { cartItems, cartTotal, set_isCartOpen } = useContext(CartContext);
	return (
		<CartDropdownContainer>
			<CartItems>
				{cartItems.map((item) => (
					<CartItem key={item.id} cartItem={item}></CartItem>
				))}
			</CartItems>
			<Link className="btn btn-dark rounded-0 mb-2" to="/checkout" onClick={() => set_isCartOpen(false)}>
				Checkout
			</Link>
			<div>Total: ${cartTotal}</div>
		</CartDropdownContainer>
	);
};

export default CartDropdown;
