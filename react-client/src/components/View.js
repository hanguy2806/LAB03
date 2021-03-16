import React, { useState } from "react";
import axios from "axios";

import ListCourses from './ListCourses';
import CreateCourse from './CreateCourse';
function View(props) {
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  const [course, setCourse] = useState("");
  // return a stateful value and funcion to update it
  // called when user clicks on Logout button
  // to clear the cookie and set the screen state variable
  // back to its initial state.
  const deleteCookie = async () => {
    try {
      await axios.get("/signout");
      setScreen("auth");
    } catch (e) {
      console.log(e);
    }
  };

  const addCourse = () => {
    //implement tmr
    setCourse("y");
  };

  const listCourses = () => {
    //implement tmr
    setCourse("n");
  };

  return (
    <div>
      {(() => {
        switch (course) {
          case "y":
            return <CreateCourse screen={screen} setScreen={screen} />;
          case "n":
            return <ListCourses screen={screen} setScreen={screen} />;
          default:
            return (
              <div>
                <p>Student Number: {screen}</p>
                <button onClick={addCourse}>Add Course</button>
                <button onClick={listCourses}>List Course</button>
                <button onClick={deleteCookie}>Log out</button>
              </div>
            );
        }
      })()}
    </div>
  );
}
//
export default View;
