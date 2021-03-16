import React, { useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
// import ListCourses from './ListCourses';
import CreateCourse from './CreateCourse';
import CoursesByStudentID from "./CoursesByStudentID";
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
            return <CoursesByStudentID screen={screen} setScreen={screen} />;
          default:
            return (
              <div>
                <h2>Student Number: {screen}</h2><br /><br />
                <Button variant="success" type="submit" onClick={addCourse}>Add Course</Button> <br /><br />
                <Button className="mx-3" variant="primary" type="submit" onClick={listCourses}>List Courses By Student</Button> <br /><br />
                <Button variant="warning" type="submit" onClick={deleteCookie}>Log Out</Button>
              </div>
            );
        }
      })()}
    </div>
  );
}
//
export default View;
