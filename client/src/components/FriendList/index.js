import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const FriendList = ({ friendCount, username, friends }) => {
    if(!friends || !friends.length) {
        return(
            <Card className='mx-5 my-4 py-2 px-5'>
                <Card.Body className='text-center my-2 p-2'>
                    {username}, make some friends!
                </Card.Body>
            </Card>
        )
    }
    
    return(
        <Card className='mx-3 my-4 py-2 px-5'>
            <Card.Title className='text-center'>
                {username}'s {friendCount > 1 ? friendCount : ''} {friendCount === 1 ? 'friend' : 'friends'}
            </Card.Title>
            {friends.map(friend => (
                <Link key={friend._id} to={`/profile/${friend.username}`}>
                    <Button className="w-100 align-self-center mb-1" variant="dark">
                        {friend.username}
                    </Button>
                </Link>
            ))}
        </Card>
    );
};

export default FriendList;