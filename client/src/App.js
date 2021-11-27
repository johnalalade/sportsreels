import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from './Screens/home'
import './App.css';
import Landing from './Screens/landing';
import Welcome from './Screens/welcome';
import Logins from './Screens/login';
import SignUp from './Screens/signup';
import Profile2 from './Screens/profile2';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Landing}/>
            <Route path='/login' component={Logins}/>
            <Route path='/signup' component={SignUp}/>
            <Route path='/welcome' component={Welcome}/>
            <Route path='/profile' component={Profile2}/>
            <Route path='/home' component={Home}/>

          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
