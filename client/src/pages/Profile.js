import React from "react";
import Spinner from "react-bootstrap/Spinner";
import { Navigate, useParams } from "react-router-dom";
import Post from "../components/Post";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';	
import FriendList from "../components/FriendList";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import PostForm from "../components/PostForm";
import FriendButton from '../components/FriendButton';

const Profile = () => {
	const { username: userParam } = useParams();

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

	return (
		<Container fluid='sm'>
                <Row xs={1} md={1} lg={2}>
                    <Col lg={4} className='d-flex flex-column align-items-center'>
					<h5 className="mx-4 mb-3 text-center">
						Viewing {userParam ? `${user.username}'s` : "your"} profile
					</h5>

					{userParam && Auth.loggedIn() ? <FriendButton user={user} userParam={userParam} /> : null}
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
	);
};

export default Profile;
