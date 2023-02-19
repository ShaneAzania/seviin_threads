import "./checkout.route.scss";

import CheckoutItem from "../../components/checkout-item/checkout-item";
// import PaymentForm from "../../components/payment-form/payment-form";

// redux
import { useSelector } from "react-redux";
// redux selector
import { cart_selector } from "../../redux-store/cart/cart.selector";

// context
// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";

function Checkout() {
	const { cartItems, cartTotal } = useSelector(cart_selector);
	return (
		<div className="checkout-container container">
			<table className="table">
				<thead>
					<tr>
						<th scope="col">Product</th>
						<th scope="col">Quantity</th>
						<th scope="col">Price</th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
					{cartItems.map((item) => {
						return <CheckoutItem key={item.id} item={item} />;
					})}
				</tbody>
			</table>
			<h2 className="cart-total">TOTAL: ${cartTotal}</h2>
		</div>
	);
}

export default Checkout;
