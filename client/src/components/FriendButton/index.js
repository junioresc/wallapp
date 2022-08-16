import React, { useState, useEffect } from 'react';
import { QUERY_ME_BASIC } from '../../utils/queries';
import { useQuery, useMutation } from "@apollo/client";
import { ADD_FRIEND, REMOVE_FRIEND } from "../../utils/mutations";
import Button from 'react-bootstrap/Button';
import Alert from "react-bootstrap/Alert";
import Auth from "../../utils/auth";

function simulateNetworkRequest() {
	return new Promise((resolve) => setTimeout(resolve, 1500));
}

const FriendButton = ({ userParam, user }) => {

    const { data: userData } = useQuery(QUERY_ME_BASIC);
    const [showAlert, setShowAlert] = useState(false);

    const [addFriend, { error }] = useMutation(ADD_FRIEND);
    const [removeFriend] = useMutation(REMOVE_FRIEND);

    const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		if (isLoading) {
		simulateNetworkRequest().then(() => {
			setLoading(false);
		});
		}
	}, [isLoading]);

    const handleClick = async () => {
		try {
			setLoading(true)
            if (!userData?.me.friends.filter(friend => friend['username'] === userParam )[0]?.username) {
                await addFriend({
                    variables: { id: user._id },
                });
            } else {
                await removeFriend({
                    variables: { id: user._id },
                });
            }

		} catch (error) {
			console.error(error);
			setShowAlert(true)
		}
	};

    return(
        <div>
            {!userData?.me.friends.filter(friend => friend['username'] === userParam )[0]?.username && Auth.loggedIn() ? (
                <Button
                    className="mx-5"
                    disabled={isLoading}
                    onClick={!isLoading ? handleClick : null}
                    variant="dark"
                >
                    {isLoading ? 'Removing…' : 'Add Friend'}
                </Button>
            ) : (
                <Button
                    className="mx-5"
                    disabled={isLoading}
                    onClick={!isLoading ? handleClick : null}
                    variant="dark"
                >
                    {isLoading ? 'Adding…' : 'Remove Friend'}
                </Button>
            )}
            <Alert
						dismissible
						onClose={() => setShowAlert(false)}
						show={showAlert}
						variant="danger"
					>
						{error ? 'Friend was not added, Please try again.' : null }
			</Alert>
        </div>
    );
};

export default FriendButton;