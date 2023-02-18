// import "./cart-dropdown-styles";
import { CartDropdownContainer, CartItems, Btn } from "./cart-dropdown.styles";

// redux
import { useSelector, useDispatch } from "react-redux";
// redux actions
import { set_isCartOpen } from "../../redux-store/cart/cart.action";
// redux selectors
import { cart_selector } from "../../redux-store/cart/cart.selector";

// context
// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";

import CartItem from "../cart-item/cart-item";

const CartDropdown = () => {
	const dispatch = useDispatch();
	// const { cartItems, cartTotal, set_isCartOpen } = useContext(CartContext);
	const { cartItems, cartTotal } = useSelector(cart_selector);

	return (
		<CartDropdownContainer>
			<CartItems>
				{cartItems.map((item) => (
					<CartItem key={item.id} cartItem={item}></CartItem>
				))}
			</CartItems>
			<Btn className="btn btn-dark rounded-0 mb-2" to="/checkout" onClick={() => dispatch(set_isCartOpen(false))}>
				Checkout
			</Btn>
			<div>Total: ${cartTotal}</div>
		</CartDropdownContainer>
	);
};

export default CartDropdown;
