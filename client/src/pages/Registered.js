import React, { useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { motion } from 'framer-motion';

const Registered = () => {
	useEffect(() => {
		setTimeout(() => {
			window.location.assign("/");
		}, 5000);
	}, []);

	return (
		<motion.div
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			exit={{opacity: 0}}
		>
			<div className="d-flex flex-column align-items-center">
				<h2 className="text-center pt-5">Thank you for signing up to the Wall App!</h2>
				<h3 className="text-center">We have sent you an email to the address provided, please check and confirm your email</h3>
				<h4 className="text-center">You will be redirected to the home page in 5 seconds.</h4>
				<Spinner animation="border" role="status" className="mt-4">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			</div>
		</motion.div>
	);
};

export default Registered;
