import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const FriendList = ({ friendCount, username, friends }) => {
    if(!friends || !friends.length) {
        return(
            <Card className='mx-5'>
                <Card.Body className='text-center my-2 p-2'>
                    {username}, make some friends!
                </Card.Body>
            </Card>
        )
    }
    
    return(
        <Card className='d-flex mx-3 my-4 p-2 justify-content-center'>
            <Card.Title className='text-center'>
                {username}'s {friendCount > 1 ? friendCount : ''} {friendCount === 1 ? 'friend' : 'friends'}
            </Card.Title>
            {friends.map(friend => (
                <Button className="w-75 align-self-center mb-1" variant="light" key={friend._id}>
                    <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
                </Button>
            ))}
        </Card>
    );
};

export default FriendList;