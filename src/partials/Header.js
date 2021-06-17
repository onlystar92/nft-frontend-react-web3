import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';



function RenderHeader(props) {
    let navigate = useNavigate();

    function logout() {
        props.logout();
        navigate('/');
    }
    const scrollGame = () =>{
        const url2 = '/mvp'

        if (window.location.pathname  === url2) {
            window.scrollTo(0, 500);
        }
    }



    if (props.activeUser && props.activeAuthenticator) {
        return (
            <div className="header">
                <header className="mw80">
                    <Navbar className="header" expand="lg">
                        {/*<Navbar.Brand className="header__logo" href="/">
                            <img src={logo} alt="WAX labs icon"/>
                        </Navbar.Brand>*/}
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="header__toggleButton"/>
                        <Navbar.Collapse id="responsive-navbar-nav" className="header__collapse">

                            <NavDropdown title={props.accountName} id="basic-nav-dropdown" bsPrefix="dropdown__button">
                                <NavDropdown.Item bsPrefix="dropdown__item" onClick={logout}>
                                    {'Logout'}
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Navbar.Collapse>
                    </Navbar>
                </header>
            </div>
        );
    } else {
        return (
            <header>
                <Navbar className="header p25" expand="lg">
                    <div className="container">
                        <Nav.Link bsPrefix="button ml-auto button--secondary loginBtn" onClick={props.showModal}>
                            {'Login'}
                        </Nav.Link>
                    </div>
                </Navbar>

            </header>
        );
    }
}

export default RenderHeader;
