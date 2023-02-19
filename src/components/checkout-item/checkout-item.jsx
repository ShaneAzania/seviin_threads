import {
	CheckoutItemContainer,
	CheckoutItemImg,
	IncreaseDecreaseCartItem,
	RemoveCartItem,
} from "./checkout-item.styles";

//react
import { Fragment } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
// redux selector
import { cart_selector } from "../../redux-store/cart/cart.selector";
// react actions
import { addItemToCart, subtractItemFromCart, deleteFromCart } from "../../redux-store/cart/cart.action";

// context
// import { useContext, Fragment } from "react";
// import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({ onClick, children, item }) => {
	const { id, imageUrl, name, quantity, price } = item,
		dispatch = useDispatch(),
		{ cartItems } = useSelector(cart_selector);
	// { subtractItemFromCart, addItemToCart, deleteFromCart } = useContext(CartContext);
	return (
		<Fragment>
			<CheckoutItemContainer key={id}>
				<td>
					<CheckoutItemImg src={imageUrl} alt={name} />
					{name}
				</td>
				<td>
					<IncreaseDecreaseCartItem onClick={() => dispatch(subtractItemFromCart(item, cartItems))}>
						{"< "}
					</IncreaseDecreaseCartItem>
					<span className="cart-item-quantity">{quantity}</span>
					<IncreaseDecreaseCartItem onClick={() => dispatch(addItemToCart(item, cartItems))}>
						{" >"}
					</IncreaseDecreaseCartItem>
				</td>
				<td>{price}</td>
				<td>
					<RemoveCartItem onClick={() => dispatch(deleteFromCart(item, cartItems))}>Remove</RemoveCartItem>
				</td>
			</CheckoutItemContainer>
		</Fragment>
	);
};

export default CheckoutItem;
