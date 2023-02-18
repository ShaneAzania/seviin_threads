import { Img, ProductCardContainer, ProductCardFooter } from "./productCard.styles.jsx";

// redux
import { useSelector, useDispatch } from "react-redux";
// redux selectors
import { cart_selector } from "../../redux-store/cart/cart.selector.js";
// redux actions
import { addItemToCart } from "../../redux-store/cart/cart.action.js";

// context
// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";

function ProductCard({ product }) {
	const { imageUrl, name, price } = product;
	// const { addItemToCart } = useContext(CartContext);

	// dispatch
	const dispatch = useDispatch();
	// redux states
	const { cartItems } = useSelector(cart_selector);

	const addToCartHandler = (e) => {
		dispatch(addItemToCart(product, cartItems));
	};

	return (
		<ProductCardContainer>
			<Img src={imageUrl} alt={`${name}`} />
			<ProductCardFooter>
				<span>{name}</span>
				<span>${price}</span>
			</ProductCardFooter>
			<button className="btn btn-outline-light rounded-0 text-center " onClick={addToCartHandler}>
				Add to cart
			</button>
		</ProductCardContainer>
	);
}

export default ProductCard;
