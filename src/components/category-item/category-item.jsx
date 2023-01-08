import { CategoryContainer, BackgroundImage, CategoryBodyContainer } from "./category-item.styles";

import { useNavigate } from "react-router-dom";

const CategoryItem = ({ id, title, imageUrl }) => {
	const navigate = useNavigate(),
		handleCategoryClick = () => {
			navigate("/shop/" + title.toLowerCase());
		};
	return (
		<CategoryContainer>
			<BackgroundImage imageUrl={imageUrl}></BackgroundImage>
			<CategoryBodyContainer onClick={handleCategoryClick}>
				<h2>{title.toUpperCase()}</h2>
				<p>Shop Now</p>
			</CategoryBodyContainer>
		</CategoryContainer>
	);
};

export default CategoryItem;
