import {} from "./sign-up-form.styles.jsx";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createAuthUserWithEmailAndPassword, logGoogleUsersWithPopUp } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input";

const defaultFormFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
};
export default function SignUpForm({ className }) {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const resetFormFields = () => setFormFields(defaultFormFields);

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		//validate fileds
		var valid = true;
		// try {
		// 	if (currenntUser) {
		// 		valid = false;
		// 		alert("A user is already logged in.");
		// 	}
		// } catch (error) {}
		if (displayName.length < 4) {
			valid = false;
			alert("Display name must be at least 5 charcters long.");
		}
		if (password !== confirmPassword) {
			valid = false;
			alert("Passwords do not match.");
		}
		if (password.length < 8) {
			valid = false;
			alert("Password must be at least 8 characters long.");
		}
		if (email.length < 6) {
			valid = false;
			alert("Pnvalid email.");
		}
		if (!valid) {
			return;
		}

		// create user
		const userAuth = await createAuthUserWithEmailAndPassword(email, password, displayName);
		// console.log("sign-up:", userAuth);

		if (userAuth) {
			resetFormFields();

			navigate("/");
		}
	};

	const handleGoogleSignIn = async () => {
		await logGoogleUsersWithPopUp();

		navigate("/");
	};

	return (
		<div className={className}>
			<form action="" method="POST" onSubmit={handleSubmit}>
				<h1> Don't Have An Account? </h1>
				<h2> Sign-Up </h2>
				<FormInput
					label="Display Name"
					name="displayName"
					onChange={handleChange}
					type="text"
					value={displayName}
				/>
				<FormInput label="Email" name="email" onChange={handleChange} type="email" value={email} />
				<FormInput label="Password" name="password" onChange={handleChange} type="password" value={password} />
				<FormInput
					label="Confirm Password"
					name="confirmPassword"
					onChange={handleChange}
					type="password"
					value={confirmPassword}
				/>
				<button className="btn btn-block btn-outline-dark rounded-0 w-100 mb-2" type="submit">
					Sign Up
				</button>
			</form>
			<button className="btn btn-outline-primary rounded-0 w-100" onClick={handleGoogleSignIn}>
				Google Sign Up
			</button>
		</div>
	);
}
