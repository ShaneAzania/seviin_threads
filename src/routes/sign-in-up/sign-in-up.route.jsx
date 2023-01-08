import "./sign-in-up.route.scss";
import { Fragment } from "react";
import SignInForm from "../../components/sign-in-form/sign-in-form";
import SignUpForm from "../../components/sign-up-form/sign-up-form";

const SignInUP = () => {
	return (
		<Fragment>
			<div className="row px-3 justify-content-center">
				<SignInForm className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mx-2 mb-5" />
				<SignUpForm className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mx-2 mb-5" />
			</div>
		</Fragment>
	);
};

export default SignInUP;
