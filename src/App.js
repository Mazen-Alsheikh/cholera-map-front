import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from "./components/LoginPage";
import MyNav from "./components/MyNav";
import Home from "./components/Home";
import Users from "./components/Users";
import "./index.css";
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './utls/UserContext';
import Logout from './components/Logout';
import User from './components/User';
import Profile from './components/Profile';
import CholeraForm from './components/CholeraForm';
import ProtectedRoute from './utls/ProtectedRoute';

export default function App() {
  return (
    <UserProvider>
      <Router>
        <MyNav/>
        <Container className='bg-dark text-light min-vh-100'>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<LoginPage/>}/>
              <Route path='/logout' element={<Logout/>}/>
              <Route path='/control' element={
                <ProtectedRoute>
                  <CholeraForm/>
                </ProtectedRoute>}/>
              <Route path='/users' element={
                <ProtectedRoute>
                  <Users/>
                </ProtectedRoute>}/>
              <Route path='/user' element={
                <ProtectedRoute>
                  <User/>
                </ProtectedRoute>}/>
              <Route path='/profile' element={
                <ProtectedRoute>
                  <Profile/>
                </ProtectedRoute>}/>
              <Route path="/form" element={
                <ProtectedRoute>
                  <CholeraForm/>
                </ProtectedRoute>}/>
            </Routes>
        </Container>
      </Router>
    </UserProvider>

  );
};