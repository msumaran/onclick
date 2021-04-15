import React from 'react'
import * as router from 'react-router-dom'

import { UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap'
import PropTypes from 'prop-types'
import { AppNavbarBrand, AppSidebarToggler, AppBreadcrumb } from '@coreui/react'

import routes from 'helpers/routes'

import logo from 'assets/img/brand/logo.png'
import iso from 'assets/img/brand/iso.png'

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
          width: 155,
          height: 55,
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

      <AppBreadcrumb className="d-none d-lg-block" appRoutes={routes} router={router} />

      <Nav className="ml-auto" navbar>
        <UncontrolledDropdown nav direction="down">
          <DropdownToggle nav
            style={{
              display: 'flex',
            }}
          >
            <span className="d-none d-sm-flex" style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              {props.user.name}
            </span>
            <span className="img-avatar"
              style={{
                border: '1px solid #333',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width: 35
              }}
            >
              {props.user.name.substring(0, 1).toUpperCase()}
            </span>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem href="/security/change-password">
              <i className="icon-lock-open"></i> Cambiar contraseña
            </DropdownItem>
            <DropdownItem onClick={(e) => props.onLogout(e)}>
              <i className="icon-logout"></i> Cerrar sesión
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
