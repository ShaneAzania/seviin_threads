import { CategoriesContainer } from "./directory.styles";
import CategoryItem from "../category-item/category-item";

function Directory({ categories }) {
	return (
		<CategoriesContainer>
			{categories.map((category) => (
				<CategoryItem key={category.id} {...category} className="category-container" />
			))}
		</CategoriesContainer>
	);
}

export default Directory;
