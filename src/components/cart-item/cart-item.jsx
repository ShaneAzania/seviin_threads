import {
	CartItemContainer,
	CartItemImage,
	CartItemsDetails,
	CartItemName,
	IncreaseDecreaseCartItem,
	RemoveCartItem,
} from "./cart-item.styles";

//redux
import { useSelector, useDispatch } from "react-redux";
// redux actions
import { addItemToCart, subtractItemFromCart, deleteFromCart } from "../../redux-store/cart/cart.action";
//redux selector
import { cart_selector } from "../../redux-store/cart/cart.selector";

// context
// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";

const CartItem = ({ onClick, children, cartItem }) => {
	const { name, imageUrl, price, quantity } = cartItem;

	// redux state
	const { cartItems } = useSelector(cart_selector);
	//dispatch
	const dispatch = useDispatch();

	return (
		<CartItemContainer onClick={onClick}>
			<CartItemImage style={{ backgroundImage: `url(${imageUrl})` }}></CartItemImage>
			<CartItemsDetails>
				<CartItemName>{name}</CartItemName>
				<div className="cart-item-quantity-and-price-container">
					<span className="cart-item-price">${price}</span>
				</div>
				<div className="changeQuantity">
					<IncreaseDecreaseCartItem onClick={() => dispatch(subtractItemFromCart(cartItem, cartItems))}>
						{"< "}
					</IncreaseDecreaseCartItem>
					<span className="cart-item-quantity">{quantity}</span>
					<IncreaseDecreaseCartItem onClick={() => dispatch(addItemToCart(cartItem, cartItems))}>
						{" >"}
					</IncreaseDecreaseCartItem>
				</div>
				<RemoveCartItem onClick={() => dispatch(deleteFromCart(cartItem, cartItems))}>Remove</RemoveCartItem>
			</CartItemsDetails>
		</CartItemContainer>
	);
};

export default CartItem;
