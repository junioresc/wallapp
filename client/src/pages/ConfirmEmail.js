import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Spinner from "react-bootstrap/Spinner";
import { useMutation } from "@apollo/client";
import { CONFIRM_EMAIL } from "../utils/mutations";
import Auth from '../utils/auth';


const ConfirmEmail = () => {
    const { token: userParam } = useParams();
    const [userData, setUserData] = useState({token: ''})
    const [showAlert, setShowAlert] = useState(false);

    const [confirm, { error }] = useMutation(CONFIRM_EMAIL);

    useEffect(() => {
        const token = window.location.pathname.split('/')[2].toString();
        console.log(token)
        const user = Auth.confirmEmail(token);
        console.log(user.data.username);
        // try {
        //     const { data } = await confirm({
        //         variables: { ...userData }
        //     });
        //     Auth.confirm(data.confirmation.token);
        // } catch (error) {
        //     console.error(error);
        //     setShowAlert(true);
        // }
    }, []);

    // useEffect(() => {
    //     setTimeout(() => {
    //         window.location.assign('/');
    //     }, 7000)
    //   }, []);

	return (
        <>
        <h2>Thank you for confirming your email!</h2>
        <h4>You will be redirected to the login page in 7 seconds.</h4>
		<Spinner animation="border" role="status">
			<span className="visually-hidden">Loading...</span>
		</Spinner>
        </>
	);
};

export default ConfirmEmail;
