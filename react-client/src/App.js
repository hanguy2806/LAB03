import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from 'react-router-dom';
//
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';
//
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import ListStudents from './components/ListStudents';
import ShowStudent from './components/ShowStudent';
import EditStudent from './components/EditStudent';
//
function App() {
    return (
        <Router>
            <Navbar bg='light' expand='lg'>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Navbar.Collapse className='mr-auto'>
                        <Nav.Link href='/home'>Home</Nav.Link>
                        <Nav.Link href='/login'>Login</Nav.Link>
                        <Nav.Link href='/signup'>Sign up</Nav.Link>
                        <Nav.Link href='/listStudents'>List Students</Nav.Link>
                    </Navbar.Collapse>
                </Navbar.Collapse>
            </Navbar>

            <div>
                <Route exact path='/'>
                    <Redirect to='/home'></Redirect>
                </Route>
                <Route render={() => <Home />} path='/home' />
                <Route render={() => <Login />} path='/login' />
                <Route render={() => <Signup />} path='/signup' />
                <Route render={() => <ListStudents />} path='/listStudents' />
                <Route render={() => <EditStudent />} path='/editStudent/:id' />
                <Route render={() => <ShowStudent />} path='/showStudent/:id' />
            </div>
        </Router>
    );
}

export default App;
