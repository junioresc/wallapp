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
	console.log({ username: userParam });

	const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
		variables: { username: userParam },
	});

	const user = data?.me || data?.user || {};
	console.log(Auth.getProfile());
	if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
		return <Navigate to="/profile" />;
	}

	if (loading) {
		return (
			<Spinner animation="border" role="status">
				<span className="visually-hidden">Loading...</span>
			</Spinner>
		);
	}

	if (!user?.username) {
		console.log(user);
		return (
			<h4 className="text-center">
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
		<div>
			<div>
				<h2 className="px-5">
					Viewing {userParam ? `${user.username}'s` : "your"} profile.
				</h2>

				{userParam && (
					<button className="btn ml-auto" onClick={handleClick}>
						Add Friend
					</button>
				)}
			</div>

			<div className="flex-row justify-space-between mb-3">
				<div className="col-12 mb-3 col-lg-8">
					<PostList posts={user.posts} title={`${user.username}'s posts...`} />
				</div>

				<div className="col-12 col-lg-3 mb-3">
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
				</div>
			</div>
			{!userParam && <PostForm />}
		</div>
	);
};

export default Profile;
