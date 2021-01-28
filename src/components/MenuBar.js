import React, {useState, useContext} from 'react'
import { Menu } from 'semantic-ui-react';
import {Link} from 'react-router-dom';


import { AuthContext } from '../context/auth';

 function MenuBar() {

   const { user, logout } = useContext(AuthContext);
   const pathname = window.location.pathname;
    
   let path = pathname === '/' ? 'home' : pathname.substr(1);

   const handleItemClick = (e, { name }) => setActiveItem(name);
   const [activeItem, setActiveItem] = useState(path);
 

   
   const menuBar = user ? (
    <Menu pointing secondary size="massive" color="green" style={{marginBottom:"0"}}>
      <Menu.Item name="Home"
        active={activeItem === 'Home'}
        onClick={handleItemClick} 
        as={Link} to="/" />

      <Menu.Item name={user.username}
        active={activeItem === user.username}
        onClick={handleItemClick} 
        as={Link} to="/users" />
        <p style={{paddingLeft:"15rem",fontSize: "larger" ,color:"#2A560A", margin:"0.5em auto 0.5em auto"}} >ENVIROMANIA <i className="leaf icon"></i></p>
       <Menu.Menu position="right">
        <Menu.Item name="logout" as={Link} to="/" onClick={logout} />
      </Menu.Menu>
    </Menu>
  ) : (
     <Menu  pointing secondary size="massive" color="green">
    {/* This is for the Home page where all the Blog stuff is */}
    
    <Menu.Item
    name= "home"

    active={activeItem === 'home'}
    onClick={handleItemClick}
    as={Link}
    to="/"
    />
    {/* They are logged in */}
    <p style={{paddingLeft:"25%",fontSize: "larger" ,color:"#2A560A", margin:"0.5em auto 0.5em auto"}} >ENVIROMANIA <i className="leaf icon"></i></p>
      
    <Menu.Menu position="right">
     <Menu.Item
      name="login"
      active={activeItem === 'login'}
      onClick={handleItemClick}
      as={Link}
      to="/login"
    />
    <Menu.Item
      name="register"
      active={activeItem === 'register'}
      onClick={handleItemClick}
      as={Link}
      to="/register"
    />
    </Menu.Menu>
  </Menu>

  );

  return menuBar;
}

export default MenuBar;
