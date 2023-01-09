import { Img, ProductCardContainer, ProductCardFooter } from "./productCard.styles.jsx";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

function ProductCard({ product }) {
	const { imageUrl, name, price } = product;
	const { addItemToCart } = useContext(CartContext);

	const addToCartHandler = (e) => {
		addItemToCart(product);
	};

	return (
		<ProductCardContainer>
			<Img src={imageUrl} alt={`${name}`} />
			<ProductCardFooter>
				<span>{name}</span>
				<span>${price}</span>
			</ProductCardFooter>
			<button className="btn btn-outline-light rounded-0 text-center " onClick={addToCartHandler}>
				Add to card
			</button>
		</ProductCardContainer>
	);
}

export default ProductCard;
