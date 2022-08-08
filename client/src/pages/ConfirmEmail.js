import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { useMutation } from "@apollo/client";
import { CONFIRM_EMAIL } from "../utils/mutations";
import Auth from "../utils/auth";

const ConfirmEmail = () => {
	const { token } = useParams();
	const { username, email, _id } = Auth.confirmEmail(token).data;
	const [userData] = useState({ username, email, _id });
	const [showAlert, setShowAlert] = useState(false);

	const [confirmation, { error }] = useMutation(CONFIRM_EMAIL);

	const confirmEmail = async () => {
		try {
			const data = confirmation({
				variables: { ...userData },
			});
			console.log(userData);
			console.log(data);
		} catch (error) {
			console.error(error);
			setShowAlert(true);
		}
	};
	useEffect(() => {
		confirmEmail();
	}, []);

	useEffect(() => {
		setTimeout(() => {
			window.location.assign("/login");
		}, 5000);
	}, []);

	return (
		<>
			<Alert
				dismissible
				onClose={() => setShowAlert(false)}
				show={showAlert}
				variant="danger"
			>
				{error
					? error.message
					: "Something went wrong confirming your email, Please try again."}
			</Alert>
			<h2>Thank you for confirming your email!</h2>
			<h4>You will be redirected to the login page in 7 seconds.</h4>
			<Spinner animation="border" role="status">
				<span className="visually-hidden">Loading...</span>
			</Spinner>
		</>
	);
};

export default ConfirmEmail;
