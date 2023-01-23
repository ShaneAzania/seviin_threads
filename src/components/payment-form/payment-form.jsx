// import "./cart-dropdown-styles";
import {} from "./payment-form.styles";

// import { useContext } from "react";

import { CardElement } from "@stripe/react-stripe-js";

const PaymentForm = () => {
	// const {} = useContext();

	return (
		<div>
			<CardElement />
			<button className="btn btn-outline-dark">Pay Now</button>
		</div>
	);
};

export default PaymentForm;
