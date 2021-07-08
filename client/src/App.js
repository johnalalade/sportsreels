import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from './Home'
import './App.css';
import Post from './Post';
import Delete from './Delete';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/post/v144' component={Post}/>
            <Route path='/delete/v144' component={Delete}/>

          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
