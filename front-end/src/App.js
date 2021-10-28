import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, HashRouter } from 'react-router-dom'
import HomePage from './layouts/home'
import Admin from './layouts/admin';
import UserProfile from './views/home/userProfile';
import PlayCourse from './views/home/playCourse';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/tai-khoan" component={UserProfile} />
          <Route path="/bai-hoc" component={PlayCourse} />
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    </>
  );
}
 
export default App;
