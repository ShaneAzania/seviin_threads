import styled from "styled-components";

export const CartItemContainer = styled.div`
	display: flex;
	justify-content: space-between;
	height: 90px;
	margin-bottom: 8px;
`;

export const CartItemImage = styled.div`
	width: 35%;
	height: 100%;
	background-size: cover;
	background-position: center;
`;

export const CartItemsDetails = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
`;
export const CartItemName = styled.span`
	font-weight: bold;
`;
// .cart-item-quantity-and-price-container {
// 	.cart-item-quantity {
// 	}
// 	.cart-item-price {
// 	}
// }
export const IncreaseDecreaseCartItem = styled.span`
	cursor: pointer;
	font-weight: bolder;
	user-select: none;
	&:hover {
		color: rgb(186, 186, 186);
	}
`;
export const RemoveCartItem = styled.div`
	color: red;
	cursor: pointer;
	user-select: none;
	&:hover {
		color: rgb(255, 117, 117);
	}
`;
