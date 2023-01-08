import styled from "styled-components";

export const CheckoutItemContainer = styled.tr`
	td {
		vertical-align: middle;
	}
`;
export const CheckoutItemImg = styled.img`
	height: 100px;
	margin: 0 1em 0 0;
`;

export const IncreaseDecreaseCartItem = styled.span`
	cursor: pointer;
	font-weight: bolder;
	user-select: none;
	&:hover {
		color: rgb(186, 186, 186);
	}
`;

export const RemoveCartItem = styled.span`
	color: red;
	cursor: pointer;
	user-select: none;
	&:hover {
		color: rgb(255, 117, 117);
	}
`;
