import "./shop.route.scss";

// react
import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";

//redux
import { useSelector } from "react-redux";

import { categories_selector } from "../../redux-store/categories/categories.selector";

//context
// import { useContext } from "react";
// import { CategoriesContext } from "../../contexts/categories.context";

import ProductCard from "../../components/product-card/productCard";

// import SHOP_DATA from "../../data/shop-data.json";

function Shop() {
	const // { categories } = useContext(CategoriesContext),
		{ categories } = useSelector(categories_selector),
		{ categoryTitle } = useParams();

	return (
		<Fragment>
			<div className="categories-container container-fluid">
				{!categoryTitle
					? // general shop page
					  categories.map((category) => (
							<div key={category.title} className="row mb-5">
								<h2 className="col-12 pb-3">
									<Link to={"/shop/" + category.title.toLowerCase()}>{category.title}</Link>
								</h2>
								<div className="products-container row">
									{category.items
										.filter((_, index) => index < 4)
										.map((product) => (
											<ProductCard className="col-lg-3" key={product.id} product={product} />
										))}
								</div>
							</div>
					  ))
					: // category specific shop page
					  categories
							.filter((category) => category.title.toLowerCase() === categoryTitle.toLowerCase())
							.map((category) => (
								<div key={category.title} className="row mb-5">
									<h1 className="text-center pb-3">{category.title}</h1>
									<div className="products-container row">
										{category.items.map((product) => (
											<ProductCard className="col-lg-3" key={product.id} product={product} />
										))}
									</div>
								</div>
							))}
			</div>
		</Fragment>
	);
}

export default Shop;

// {category.items.map((product) => (
// 	<ProductCard className="col-lg-3" key={product.id} product={product} />
// ))}

// {categories.map((category) => (
// 	<div key={category.title} className="row mb-5">
// 		<h1 className="text-center pb-3">{category.title}</h1>
// 		<div className="products-container row">
// 			{category.items
// 				.filter((_, index) => index < 4)
// 				.map((product) => (
// 					<ProductCard className="col-lg-3" key={product.id} product={product} />
// 				))}
// 		</div>
// 	</div>
// ))}
