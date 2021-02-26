import React, { Fragment } from 'react'
import './header.scss'
import Search from '../Search/Search'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const authenticatedOptions = (
  <Fragment>
    <div className="grid-container">
      <Search/>
      <Nav.Link to="/cart">🛒MY CART</Nav.Link>
      <div className="together">
        <Nav.Link href="#change-password">| CHANGE PASSWORD</Nav.Link>
        <Nav.Link href="#sign-out">| LOG OUT</Nav.Link>
      </div>
    </div>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <div className="grid-container">
      <Search/>
      <Nav.Link to="/cart">🛒MY CART</Nav.Link>
      <div className="together">
        <Nav.Link href="#sign-up">| SIGN UP</Nav.Link>
        <Nav.Link href="#sign-in">| LOG IN </Nav.Link>
      </div>
    </div>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar className="nav" expand="md">
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav>
        { user && <span className="welcome-text">Welcome, <Nav.Link href="#profile">{user.email}</Nav.Link></span>}
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
