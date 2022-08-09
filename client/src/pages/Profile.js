import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { Navigate, useParams } from "react-router-dom";
import PostList from "../components/PostList";
import FriendList from "../components/FriendList";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import { ADD_FRIEND } from "../utils/mutations";
import PostForm from "../components/PostForm";

const Profile = (props) => {
	const { username: userParam } = useParams();
	const [showAlert, setShowAlert] = useState(false);

	const [addFriend, { error }] = useMutation(ADD_FRIEND);

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

	const handleClick = async () => {
		try {
			await addFriend({
				variables: { id: user._id },
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="d-flex flex-wrap justify-content-center flex-lg-nowrap">
			<div className="d-flex flex-column mt-4">
				<h5 className="mx-4 text-center">
					Viewing {userParam ? `${user.username}'s` : "your"} profile
				</h5>

				{userParam && Auth.loggedIn() ? (
					<button
						className="btn bg-dark text-white mx-5 mb-3"
						onClick={handleClick}
					>
						Add Friend
					</button>
				) : null}
				<Alert
					dismissible
					onClose={() => setShowAlert(false)}
					show={showAlert}
					variant="danger"
				>
					{error ? error.message : "Friend was not added, Please try again."}
				</Alert>
				<FriendList
					username={user.username}
					friendCount={user.friendCount}
					friends={user.friends}
				/>
				{!userParam && <PostForm />}
			</div>

			<PostList posts={user.posts} title={`${user.username}'s posts...`} />
		</div>
	);
};

export default Profile;
