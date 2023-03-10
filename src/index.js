import './index.scss';

// react
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// redux
import { Provider } from 'react-redux';
import { store, persistor } from './redux-store/store';
// redux persist
import { PersistGate } from 'redux-persist/integration/react';

import reportWebVitals from './reportWebVitals';

// components
import App from './App';

// import { stripePromise } from "./utils/stripe/stripe.utils";

// import { CartProvider } from "./contexts/cart.context";
// import { CategoriesProvider } from "./contexts/categories.context";
// import { UserProvider } from "./contexts/user.context";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<PersistGate persistor={persistor}>
			<BrowserRouter>
				<Provider store={store}>
					<App />
				</Provider>
			</BrowserRouter>
		</PersistGate>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
