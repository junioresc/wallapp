import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { useMutation } from "@apollo/client";
import { CONFIRM_EMAIL } from "../utils/mutations";
import Auth from "../utils/auth";
import { motion } from 'framer-motion';

const ConfirmEmail = () => {
	const { token } = useParams();
	const { username, email, _id } = Auth.confirmEmail(token).data;
	const [userData] = useState({ username, email, _id });
	const [showAlert, setShowAlert] = useState(false);

	const [confirmation, { error }] = useMutation(CONFIRM_EMAIL);

	const confirmEmail = async () => {
		try {
			confirmation({
				variables: { ...userData },
			});
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
		<motion.div
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			exit={{opacity: 0}}
		>
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
			<div className="d-flex flex-column align-items-center">
				<h2 className="text-center pt-5">Thank you for confirming your email!</h2>
				<h4 className="text-center">You will be redirected to the login page in 5 seconds.</h4>
				<Spinner animation="border" role="status" className="mt-5">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			</div>
		</motion.div>
	);
};

export default ConfirmEmail;
