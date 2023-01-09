import styled from "styled-components";

import { Link } from "react-router-dom";

export const CartDropdownContainer = styled.div`
	position: absolute;
	width: 340px;
	height: 400px;
	display: flex;
	flex-direction: column;
	padding: 20px;
	border: 1px solid black;
	background-color: white;
	top: 55px;
	right: 6px;
	z-index: 5;
`;

// export const EmptyMessage = styled.div`
// 	font-size: 18px;
// 	margin: 50px auto;
// `;

export const CartItems = styled.div`
	height: 280px;
	display: flex;
	flex-direction: column;
	overflow: scroll;
`;

export const Btn = styled(Link)`
	color: #fff !important;

	&:hover {
		color: #fff !important;
	}
`;
