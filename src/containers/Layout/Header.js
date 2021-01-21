import React from 'react'
import { NavLink } from 'react-router-dom'
import { UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap'
import PropTypes from 'prop-types'
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react'
//
import logo from 'assets/img/brand/logo.png'
import iso from 'assets/img/brand/iso.png'
import avatar from 'assets/img/avatar.jpg'

const propTypes = {
  children: PropTypes.node
}

const defaultProps = {}

const Header = (props) => {

  return (
    <React.Fragment>
      <AppSidebarToggler className="d-lg-none" display="md" mobile />
      <AppNavbarBrand
        full={{
          src: logo,
          width: 88,
          height: 25,
          alt: 'Logo'
        }}
        minimized={{
          src: iso,
          width: 30,
          height: 30,
          alt: 'ISO'
        }}
      />
      <AppSidebarToggler className="d-md-down-none" display="lg" />

      <Nav className="d-md-down-none" navbar>
        <NavItem className="px-3">
          <NavLink to="/dashboard" className="nav-link">
            Dashboard
          </NavLink>
        </NavItem>
      </Nav>
      <Nav className="ml-auto" navbar>
        <NavItem className="d-md-down-none">
          <NavLink to="#" className="nav-link">
            {props.user.name}
          </NavLink>
        </NavItem>
        <UncontrolledDropdown nav direction="down">
          <DropdownToggle nav>
            <img src={avatar} className="img-avatar" alt="" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem href="/security/change-password">
              <i className="icon-lock-open"></i> Change Password
            </DropdownItem>
            <DropdownItem onClick={(e) => props.onLogout(e)}>
              <i className="icon-logout"></i> Logout
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </React.Fragment>
  )
}

Header.propTypes = propTypes
Header.defaultProps = defaultProps

export default Header
