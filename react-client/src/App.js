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
// import List from './components/List';
// import Edit from './components/Edit';
// import Create from './components/Create';
// import Show from './components/Show';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import ListStudents from './components/ListStudents';
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
                <Route render ={()=> < ListStudents />} path="/listStudents" />
                {/* <Route render ={()=> < Edit />} path="/edit/:id" /> */}
                {/* <Route render ={()=> < Create />} path="/create" /> */}
                {/* <Route render ={()=> < Show />} path="/show/:id" /> */}
            </div>
        </Router>
    );
}

//<Route render ={()=> < App />} path="/" />
export default App;
