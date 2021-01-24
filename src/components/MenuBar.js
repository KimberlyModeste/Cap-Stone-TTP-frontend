import React, {useState} from 'react'
import { Menu } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
//import {BrowserRouter as Router} from 'react-router-dom';


export default function MenuBar() {
   const pathname = window.location.pathname;
    
   let path = pathname === '/' ? 'home' : pathname.substr(1);

   const handleItemClick = (e, { name }) => setActiveItem(name);
   const [activeItem, setActiveItem] = useState(path);
 

    return (

      <Menu  pointing secondary size="massive" color="teal">
        {/* This is for the Home page where all the Blog stuff is */}
        <Menu.Item
        name= "home"

        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to="/"
        />
        {/* They are logged in */}
        <Menu.Item
        name= "users"
        active={activeItem === 'users'}
        onClick={handleItemClick}
        as={Link}
        to="/users"
        />

      </Menu>

    )
}
