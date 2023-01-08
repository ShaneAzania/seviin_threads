import {
	CartItemContainer,
	CartItemImage,
	CartItemsDetails,
	CartItemName,
	IncreaseDecreaseCartItem,
	RemoveCartItem,
} from "./cart-item.styles";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CartItem = ({ onClick, children, cartItem }) => {
	const { id, name, imageUrl, price, quantity } = cartItem,
		{ addItemToCart, subtractItemFromCart, deleteFromCart } = useContext(CartContext);
	return (
		<CartItemContainer onClick={onClick}>
			<CartItemImage style={{ backgroundImage: `url(${imageUrl})` }}></CartItemImage>
			<CartItemsDetails>
				<CartItemName>{name}</CartItemName>
				<div className="cart-item-quantity-and-price-container">
					<span className="cart-item-price">${price}</span>
				</div>
				<div className="changeQuantity">
					<IncreaseDecreaseCartItem onClick={() => subtractItemFromCart(cartItem)}>
						{"< "}
					</IncreaseDecreaseCartItem>
					<span className="cart-item-quantity">{quantity}</span>
					<IncreaseDecreaseCartItem onClick={() => addItemToCart(cartItem)}>{" >"}</IncreaseDecreaseCartItem>
				</div>
				<RemoveCartItem onClick={() => deleteFromCart(cartItem)}>Remove</RemoveCartItem>
			</CartItemsDetails>
		</CartItemContainer>
	);
};

export default CartItem;
