import React from 'react'
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
  } from './NavbarElement';

const NavBars = () => {
    return (
        <>
      <Nav>
        <Bars />
  
        <NavMenu>
        <NavLink to='/' activeStyle>
            Home
          </NavLink>
          <NavLink to='/shopping' activeStyle>
            Shopping
          </NavLink>
          <NavLink to='/events' activeStyle>
            Scroll-Bottom
          </NavLink>
          <NavLink to='/add' activeStyle>
            Crud
          </NavLink>
          
          <NavLink to='/sign-up' activeStyle>
            Sign Up
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
    )
}

export default NavBars;
