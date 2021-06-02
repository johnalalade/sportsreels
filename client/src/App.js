import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import './App.css';

import SignUp from './Screens/Signup';
import Home from './Screens/Home';
import Login from './Screens/Login';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Switch>
            <Route exact path='/' component={SignUp}/>
            <Route exact path='/login' component={Login}/>
            <Route path='/home' component={Home}/>
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
