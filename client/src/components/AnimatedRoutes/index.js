import React from 'react';
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import Profile from "../../pages/Profile";
import SinglePost from "../../pages/SinglePost";
import NoMatch from "../../pages/NoMatch";
import ConfirmEmail from "../../pages/ConfirmEmail";
import Registered from '../../pages/Registered';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const AnimatedRoutes = () => {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route path="/registered" element={<Registered />} />
                <Route path="/profile" element={<Profile />} >
                    <Route path=':username' element={<Profile />} />
                </Route>
                <Route path="/post">
                    <Route path=":id" element={<SinglePost />} />
                </Route>
                <Route path="/confirmation">
                    <Route path=":token" element={<ConfirmEmail />} />
                </Route>
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes;