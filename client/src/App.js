import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from './Home'
import './App.css';
import Landing from './Screens/landing';
import Welcome from './Screens/welcome';
import Logins from './Screens/login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Landing}/>
            <Route path='/login' component={Logins}/>
            <Route path='/welcome' component={Welcome}/>

          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
