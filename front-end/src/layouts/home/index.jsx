import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import HomePages from '../../views/home';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from '../../components/footer';
import Call from '../../components/call';
import Chat from '../../components/chat';
import SearchBox from '../../components/searchBox';
import Cart from '../../components/cart';
import UserProfile from '../../views/home/userProfile';
import PlayCourse from '../../views/home/playCourse';

function HomePage() {
    return (
        <>
            <div className="max-w-screen-2xl my-0 mx-auto bg-gray-100">
                <div className="my-0 mx-auto relative">
                    <Route path="/tai-khoan" exact component={UserProfile} />
                    <Route path="/bai-hoc" exact component={PlayCourse} />
                    <Route path="/" component={HomePages} />
                    <Redirect from="*" to="/" />
                    <Call />
                    <Chat />
                    <Cart />
                    <SearchBox />
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default HomePage;
