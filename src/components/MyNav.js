import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useUser } from '../utls/UserContext';

function MyNav() {

  const { me } = useUser();

  return (
    <Navbar expand="lg" bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand as={Link} to="/">لوحة التحكم</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {me?.group_id === 1 ? (
              <>
                <Nav.Link as={Link} to="/form">لوحة التحكم</Nav.Link>
                <Nav.Link as={Link} to="/users">المستخدمين</Nav.Link>
                <Nav.Link as={Link} to={`/profile?id=${me.id}`}>ملفي الشخصي</Nav.Link>
                <Nav.Link as={Link} to="/logout">تسجيل الخروج</Nav.Link>
              </>
            ) : me?.group_id === 2 ? (
              <>
                <Nav.Link as={Link} to="/control">ادارة الخريطة</Nav.Link>
                <Nav.Link as={Link} to={`/profile?id=${me.id}`}>ملفي الشخصي</Nav.Link>
                <Nav.Link as={Link} to="/logout">تسجيل الخروج</Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">تسجيل الدخول</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNav;