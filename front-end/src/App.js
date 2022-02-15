import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import HomePages from './views/home';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import UserProfile from './views/home/userProfile';
import PlayCourse from './views/home/playCourse';
import 'react-toastify/dist/ReactToastify.css';
import Admin from './layouts/admin';
import LoginAdmin from './views/admin/account/login';

function App() {
    const [render, setRender] = useState(false);
    const changeRender = () => {
        setRender(!render);
    };
    return (
        <>
            <div className="max-w-screen-2xl my-0 mx-auto bg-gray-100">
                <div className="my-0 mx-auto relative">
                    <Router>
                        <Switch>
                            <Route path="/admin" exact component={LoginAdmin} />
                            <Route path="/admin/:path" component={Admin} />
                            <Route path="/tai-khoan" component={UserProfile} />
                            <Route
                                path="/bai-hoc/:id"
                                exact
                                component={PlayCourse}
                            />
                            <Route
                                path="/"
                                component={() => (
                                    <HomePages changeRender={changeRender} />
                                )}
                            />
                        </Switch>
                    </Router>
                </div>
            </div>
        </>
    );
}

export default App;
