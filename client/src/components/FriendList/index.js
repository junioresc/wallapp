import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const FriendList = ({ friendCount, username, friends }) => {
    if(!friends || !friends.length) {
        return <p>{username}, make some friends!</p>;
    }
    
    return(
        <div>
            <h5>
                {username}'s {friendCount} {friendCount === 1 ? 'friend' : 'friends'}
            </h5>
            {friends.map(friend => (
                <Button variant="light" key={friend._id}>
                    <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
                </Button>
            ))}
        </div>
    );
};

export default FriendList;