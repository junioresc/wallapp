import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { Navigate, useParams } from "react-router-dom";
import Post from "../components/Post";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';	
import FriendList from "../components/FriendList";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import { ADD_FRIEND } from "../utils/mutations";
import PostForm from "../components/PostForm";

function simulateNetworkRequest() {
	return new Promise((resolve) => setTimeout(resolve, 2000));
}

const Profile = (props) => {
	const { username: userParam } = useParams();
	const [showAlert, setShowAlert] = useState(false);

	const [addFriend, { error }] = useMutation(ADD_FRIEND);

	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		if (isLoading) {
		simulateNetworkRequest().then(() => {
			setLoading(false);
		});
		}
	}, [isLoading]);

	const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
		variables: { username: userParam },
	});

	const user = data?.me || data?.user || {};
	if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
		return <Navigate to="/profile" />;
	}

	if (loading) {
		return (
			<div className="d-flex flex-column align-items-center">
				<h3 className="text-center pt-5">Loading profile.....</h3>
				<Spinner animation="border" role="status" className="mt-5">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			</div>
		);
	}

	if (!user?.username) {
		return (
			<h4 className="text-center pt-5">
				You need to be logged in to see this page. Use the navigation links
				above to sign up or log in!
			</h4>
		);
	}

	console.log(user)

	const handleClick = async () => {
		try {
			setLoading(true)
			await addFriend({
				variables: { id: user._id },
			});

		} catch (error) {
			console.error(error);
			setShowAlert(true)
		}
	};

	return (
		<Container fluid='sm'>
                <Row xs={1} md={1} lg={2}>
                    <Col lg={4} className='d-flex flex-column align-items-center'>
					<h5 className="mx-4 mb-3 text-center">
						Viewing {userParam ? `${user.username}'s` : "your"} profile
					</h5>

					{userParam && Auth.loggedIn() ? (
						<Button
							className="mx-5"
							disabled={isLoading}
							onClick={!isLoading ? handleClick : null}
							variant="dark"
						>
							{isLoading ? 'Adding…' : 'Add Friend'}
						</Button>
					) : null}
					<Alert
						dismissible
						onClose={() => setShowAlert(false)}
						show={showAlert}
						variant="danger"
					>
						{error ? 'Friend was not added, Please try again.' : null }
					</Alert>
					<FriendList
						username={user.username}
						friendCount={user.friendCount}
						friends={user.friends}
					/>
                    </Col>
                    <Col lg={8}>
						{!userParam && <PostForm />}
						<div>
							<h3 className="mx-2 mt-2">{user.username}'s posts...</h3>
							{user.posts &&
								user.posts.map((post) => (
								<Post
									key={post._id}
									post={post}
								/>
								))}
						</div>
					</Col>
                </Row>
            </Container>
		// <div className="d-flex flex-wrap justify-content-center flex-lg-nowrap">
		// 	<div className="d-flex flex-column mt-4">
		// 		<h5 className="mx-4 text-center">
		// 			Viewing {userParam ? `${user.username}'s` : "your"} profile
		// 		</h5>

		// 		{userParam && Auth.loggedIn() ? (
		// 			<button
		// 				className="btn bg-dark text-white mx-5 mb-3"
		// 				onClick={handleClick}
		// 			>
		// 				Add Friend
		// 			</button>
		// 		) : null}
		// 		<Alert
		// 			dismissible
		// 			onClose={() => setShowAlert(false)}
		// 			show={showAlert}
		// 			variant="danger"
		// 		>
		// 			{error ? 'Friend was not added, Please try again.' : null }
		// 		</Alert>
		// 		<FriendList
		// 			username={user.username}
		// 			friendCount={user.friendCount}
		// 			friends={user.friends}
		// 		/>
		// 	</div>
		// 	<div className="d-flex flex-column">
		// 	{!userParam && <PostForm />}
		// 	<Container>
		// 		<h3 className="mx-2 mt-3">{user.username}'s posts...</h3>
		// 		{user.posts &&
		// 			user.posts.map((post) => (
		// 			<Post
		// 				key={post._id}
		// 				post={post}
		// 			/>
		// 			))}
		// 	</Container>
		// 	</div>
		// </div>
	);
};

export default Profile;
