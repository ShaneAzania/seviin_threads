import { CART_ACTION_TYPES } from "./cart.types";

export const set_isCartOpen = (open_or_close) => {
		return { type: CART_ACTION_TYPES.SET_CART_OPEN_OR_CLOSE, payload: open_or_close };
	},
	addItemToCart = (itemToAdd, cartItems) => {
		// If item is already in 'cartItems', increase the quantity value, else add 'itemToAdd'.
		var updatedCartItemsArray = [];
		// check if itemToAdd has a valid id in the cartItems[] already
		const itemToAddPresent = cartItems.find((item) => item.id === itemToAdd.id);

		// if item is already present, increase it's quantity by 1
		if (itemToAddPresent) {
			updatedCartItemsArray = cartItems.map((item) =>
				item.id === itemToAdd.id
					? //if itemToAdd matches current item in cart, increase the existing item quantity by 1
					  { ...item, quantity: item.quantity + 1 }
					: //if current item does not match, just add current item to the new cart array
					  item
			);
		} // if item is NOT already present, add quantity value to item, then add item to updatedCartItemsArray
		else {
			updatedCartItemsArray = [...cartItems, { ...itemToAdd, quantity: 1 }];
		}

		return {
			type: CART_ACTION_TYPES.SET_CART_ITEMS,
			payload: updatedCartItemsArray,
		};
	},
	subtractItemFromCart = (itemToSubtract, cartItems) => {
		var updatedCartItemsArray = [];

		// check if item is in cartItems
		const itemToSubtractPresent = cartItems.find((item) => item.id === itemToSubtract.id);

		// if item present, decrease quantity, else don't do anything
		if (itemToSubtractPresent) {
			updatedCartItemsArray = cartItems.map((item) => {
				if (item.id === itemToSubtractPresent.id) {
					// check quantity
					return { ...item, quantity: item.quantity - 1 };
				} else {
					return item;
				}
			});
			// check if quantity reaches 0, don't add to updated cart array)
			updatedCartItemsArray = updatedCartItemsArray.filter((item) => item.quantity > 0);

			return {
				type: CART_ACTION_TYPES.SET_CART_ITEMS,
				payload: updatedCartItemsArray,
			};
		}
	},
	deleteFromCart = (itemToDelete, cartItems) => {
		const updatedCartItemsArray = cartItems.filter((item) => item.id !== itemToDelete.id);

		return {
			type: CART_ACTION_TYPES.SET_CART_ITEMS,
			payload: updatedCartItemsArray,
		};
	};
 