import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS, QUERY_ME_BASIC } from '../utils/queries';
import PostList from '../components/PostList';
import Auth from '../utils/auth';
import FriendList from '../components/FriendList';
import PostForm from '../components/PostForm';

const Home = () => {
    const { loading, data } = useQuery(QUERY_POSTS);

    const { data: userData } = useQuery(QUERY_ME_BASIC);

    const posts = data?.posts || [];

    const loggedIn = Auth.loggedIn();

    return(
        <main>
            <div>
                {loggedIn && (
                    <div>
                        <PostForm />
                    </div>
                )}
                <div>
                    {loading ? (
                        <Spinner animation='border' role='status'>
                            <span>Loading...</span>
                        </Spinner>
                    ) : (
                        <PostList posts={posts} title='Here is what other people are thinking at this moment:' />
                    )}
                </div>
                { loggedIn && userData ? (
                    <div>
                        <FriendList 
                            username={userData.me.username}
                            friendCount={userData.me.friendCount}
                            friends={userData.me.friends}
                            />
                    </div>
                ) : null }
            </div>
        </main>
    );
};

export default Home;