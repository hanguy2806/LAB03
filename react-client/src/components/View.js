import React, { useState } from 'react';
//
import axios from 'axios';
//
function View(props) {
    // read the info from props, coming from the ancestor component
    const { screen, setScreen } = props;
    // return a stateful value and funcion to update it
    // called when user clicks on Logout button
    // to clear the cookie and set the screen state variable
    // back to its initial state.
    const deleteCookie = async () => {
        try {
            await axios.get('/signout');
            setScreen('auth');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <p>Student Number: {screen}</p>
            <button onClick={deleteCookie}>Log out</button>
        </div>
    );
}
//
export default View;
