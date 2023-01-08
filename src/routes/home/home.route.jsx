// import logo from './logo.svg';
import "./home.route.scss";
import categories from "../../data/categories.json";
import Directory from "../../components/directory/directory";

function Home() {
	return (
		<div className="Home">
			<Directory categories={categories} />
		</div>
	);
}

export default Home;
