import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import useIsLoggedIn from '../../hooks/useIsLoggedIn';

const Header = () => {
    const navigate = useNavigate();
    const isLoggedIn: boolean = useIsLoggedIn();

    // Handlers
    function onLogOut() {
        window.localStorage.removeItem('isLoggedIn');
        navigate('/');
    }
    return (
        <>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => navigate('/homepage')}>ABMfactura</Nav.Link>
                        <Nav.Link onClick={() => navigate('/administracion')}>Administracion</Nav.Link>
                        <Nav.Link onClick={() => navigate('/componentes')}>Componentes</Nav.Link>
                        {isLoggedIn && <Nav.Link onClick={onLogOut}>Log Out</Nav.Link>}
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;
