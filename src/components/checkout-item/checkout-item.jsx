import {
	CheckoutItemContainer,
	CheckoutItemImg,
	IncreaseDecreaseCartItem,
	RemoveCartItem,
} from "./checkout-item.styles";

import { useContext, Fragment } from "react";
import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({ onClick, children, item }) => {
	const { id, imageUrl, name, quantity, price } = item,
		{ subtractItemFromCart, addItemToCart, deleteFromCart } = useContext(CartContext);
	return (
		<Fragment>
			<CheckoutItemContainer key={id}>
				<td>
					<CheckoutItemImg src={imageUrl} alt={name} />
					{name}
				</td>
				<td>
					<IncreaseDecreaseCartItem onClick={() => subtractItemFromCart(item)}>
						{"< "}
					</IncreaseDecreaseCartItem>
					<span className="cart-item-quantity">{quantity}</span>
					<IncreaseDecreaseCartItem onClick={() => addItemToCart(item)}>{" >"}</IncreaseDecreaseCartItem>
				</td>
				<td>{price}</td>
				<td>
					<RemoveCartItem onClick={() => deleteFromCart(item)}>Remove</RemoveCartItem>
				</td>
			</CheckoutItemContainer>
		</Fragment>
	);
};

export default CheckoutItem;
