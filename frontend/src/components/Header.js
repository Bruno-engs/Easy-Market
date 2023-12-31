import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const logoutHandler = () => {
    dispatch(logout())
  }

  const openDrawer = () => {
    const event = new CustomEvent('openCart');
    window.dispatchEvent(event)
  }
  return (
    <header>
      <Navbar expand='lg' collapseOnSelect>
        <Container>
          <Nav className='ml-auto'>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Perfil</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Sair
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to='/login'>
                <Nav.Link>
                  <i className='fas fa-user'></i> Entrar
                </Nav.Link>
              </LinkContainer>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title='Dashboard' id='adminmenu'>
                <LinkContainer to='/admin/userlist'>
                  <NavDropdown.Item>Usuários</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/storelist'>
                  <NavDropdown.Item>Lojas</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/productlist'>
                  <NavDropdown.Item>Produtos</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/orderlist'>
                  <NavDropdown.Item>Pedidos</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
          <Navbar.Collapse id='basic-navbar-nav'>
            <LinkContainer to='/'>
              <Navbar.Brand className='mx-auto text-primary'>
                <span className="mdi mdi-cart-outline"></span>
                Easy-Market
              </Navbar.Brand>
            </LinkContainer>
            <Nav >
              <button onClick={openDrawer}
                className="btn btn-secondary ">
                <span className="mdi mdi-cart"></span>&nbsp;
                ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
