import React, { Fragment } from 'react'
import './header.scss'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link className="nav-link-right" href="#change-password">CHANGE PASSWORD</Nav.Link>
    <Nav.Link className="nav-link-right" href="#sign-out">LOG OUT</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link className="nav-link-right" href="#sign-up">| SIGN UP</Nav.Link>
    <Nav.Link className="nav-link-right" href="#sign-in">| LOG IN </Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link className="nav-link-center" to="/cart">🛒MY CART</Nav.Link>
    <Nav.Link className="nav-link-right" to="/">| HOME</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar className="nav" expand="md">
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
