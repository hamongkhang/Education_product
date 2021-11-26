import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import HomePages from './views/home';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from './components/footer';
import Call from './components/call';
import Chat from './components/chat';
import SearchBox from './components/searchBox';
import Cart from './components/cart';
import UserProfile from './views/home/userProfile';
import PlayCourse from './views/home/playCourse';
import 'react-toastify/dist/ReactToastify.css';
import FullWidthTabs from './views/home/test';
import Admin from './layouts/admin';
import LoginAdmin from './views/admin/account/login';


const loading = (
    <svg viewBox="25 25 50 50" className="preloader">
        <circle cx="50" cy="50" r="20"></circle>
    </svg>
);

function App() {
    const [render, setRender] = useState(false);
    const changeRender = () => {
        setRender(!render);
    };
    return (
        <>
            <div className="max-w-screen-2xl my-0 mx-auto bg-gray-100">
                <div className="my-0 mx-auto relative">
                    <React.Suspense fallback={loading}>
                        <Router>
                            <Switch>
                            <Route path="/admin" exact component={LoginAdmin} />
                            <Route path="/admin/:path" component={Admin} />
                                <Route
                                    path="/tai-khoan"
                                    component={UserProfile}
                                />
                                <Route
                                    path="/bai-hoc/:id"
                                    exact
                                    component={PlayCourse}
                                />
                                <Route
                                    path="/"
                                    component={() => (
                                        <HomePages
                                            changeRender={changeRender}
                                        />
                                    )}
                                />
                            </Switch>
                            <Call />
                            <Chat />
                            <Cart />
                            <SearchBox />
                            <Footer />
                        </Router>
                    </React.Suspense>
                </div>
            </div>
        </>
    );
}

export default App;
