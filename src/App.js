
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {createStore} from'redux'
import { Provider } from "react-redux";

import { AuthProvider } from "./context/auth";
import AuthRoute from './util/AuthRoute';

import './App.css';
import reducer from './redux/reducer'
import MenuBar from './components/MenuBar';
 import Home from './pages/Home';
 import Register from './pages/Register';
import UsersPage from './pages/UserPage';
import Login from './pages/Login';

 function App() {

  const initialState = {
    posts: [],
    user: null
  }

  const store = createStore(reducer, initialState);

  return (
    
    <AuthProvider>
    <Provider store={store}>
      <Router>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <Route exact path="/users" component={UsersPage} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
      </Router>
    </Provider>
    </AuthProvider>
  );
}

export default App