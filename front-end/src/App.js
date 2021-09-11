import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from './views/home'
import Login from './components/Login'
import Register from './components/Register'
function App() {
  return (
    <div className="max-w-screen-2xl my-0 mx-auto">
      <div className="my-0 mx-auto">
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}
 
export default App;
