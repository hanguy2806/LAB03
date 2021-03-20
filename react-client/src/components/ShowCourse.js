import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { withRouter } from 'react-router-dom';
import StudentListwAddBtn from './StudentListwAddBtn';

function ShowCourse(props) {
  console.log('props.match.params',props.match.params.id)
  const [data, setData] = useState({});
  const [studentData, setStudentData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [student, setStudent]=useState("");
  const [error, setError] = useState('');
  const apiUrl = "http://localhost:3000/api/courses/" + props.match.params.id;
  const apiUrl2 = "http://localhost:3000/students/";

  useEffect(() => {

    setShowLoading(false);

    const fetchData = async () => {
      
      // Get the courses:
      const result = await axios(apiUrl);
      console.log('results from courses', result.data);
      setData(result.data);

      // Get the students enrolled in the course:
      let studentArray = [];
      for(let i = 0; i < result.data.studentList.length; i++){
        const studentEnrolled = await axios(apiUrl2 + result.data.studentList[i]);
        studentArray.push(studentEnrolled.data);
      }
      setStudentData(studentArray);
      
      setShowLoading(false);
    };

    fetchData();
  }, []);


  const editCourse = (id) => {
    props.history.push({
      pathname: '/editcourse/' + id
    });
  };

  const deleteCourse = (id) => {
    setShowLoading(true);
    const course = { courseCode: data.courseCode, courseName: data.courseName, section: data.section
      , semester: data.semester, creator: data.creator, studentList:Array(data.studentList) };
   
    axios.delete(apiUrl, course)
      .then((result) => {
        setShowLoading(false);
        if(result.data.screen === 'auth'){
          setError('Delete failed: Deleting Requires Logging in as the course owner');
        }else{
          props.history.push('/listcourses');
        }
        
      }).catch((error) => {
        setError('Delete failed: Only Course owner can delete a course');
        setShowLoading(false);
      });
  };

  const addStudent = (id) => {
    setStudent('y');
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }    
      {student==='y' ? <StudentListwAddBtn/>: <div>
         <Jumbotron>

        <h1>Course Code: {data.courseCode}</h1>
        <p>Course Name: {data.courseName}</p>
        <p>Section: {data.section} Semester: {data.semester}</p>
        <p>Students Enrolled In This Course: {studentData.length}</p>
        <ListGroup>
                {studentData.map((item, idx) => (
                    <ListGroup.Item
                        key={idx}>
                        Student Name: {item.fullName} <br/> Student Number: {item.studentNumber}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        <br></br>
        <p>
          <Button type="button" variant="warning" onClick={() => { editCourse(data._id) }}>Edit Course</Button>&nbsp;
          <Button type="button" variant="danger" onClick={() => { deleteCourse(data._id) }}>Delete Course</Button>&nbsp;
          <Button type="button" variant="primary" onClick={() => { addStudent(data._id) }}>Add Student</Button>
        </p>
        {error ? <h6>{error}</h6> : <h6></h6>}
      </Jumbotron>
        </div>}     
    </div>
  );
}

export default withRouter(ShowCourse);
