import { createSelector } from "reselect";

const cart_reducer = (state) => state.cart;

// helper functions
const updateCartCountAndTotal = (theCartItems) => {
	var countAccumulator = 0,
		totalAccumulator = 0;
	theCartItems.map(({ quantity, price }) => {
		countAccumulator += quantity;
		totalAccumulator += price * quantity;
		return 0;
	});

	return { cartCount: countAccumulator, cartTotal: totalAccumulator };
};

export const cart_selector = createSelector([cart_reducer], (cart) => {
	// const countAndTotal = updateCartCountAndTotal(cart.cartItems);
	return { ...cart, ...updateCartCountAndTotal(cart.cartItems) };
});
