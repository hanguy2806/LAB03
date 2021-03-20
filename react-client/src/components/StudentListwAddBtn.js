import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';


function StudentListwAddBtn(props) {
    const [data, setData] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    const [error, setError] = useState('');
    const apiUrl = 'http://localhost:3000/students';
    const putApiUrl='http://localhost:3000/api/courses/'+props.match.params.id+'/' ;

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(apiUrl);
            setData(result.data);
            setShowLoading(false);
        };

        fetchData();
    }, []);

    const addStudent=(id)=>{
        setShowLoading(true);
    const course = { courseCode: data.courseCode, courseName: data.courseName,
         section: data.section,semester: data.semester,studentList: data.studentList };
    
    axios.put(putApiUrl+id, course)
      .then((result) => {
        setShowLoading(false);
       
          props.history.push('/listcourses');
            
      }).catch((error) => {
        setError(error);
        setShowLoading(false);
      });
      console.log(course);
    }

    return (
        <div>
            {showLoading && (
                <Spinner animation='border' role='status'>
                    <span className='sr-only'>Loading...</span>
                </Spinner>
            )}
            <ListGroup>
                {data.map((item, idx) => (
                    <ListGroup.Item
                        key={idx}
                        action
                        onClick={() => { addStudent(item._id) }}>
                        {item.fullName} ({item.studentNumber})
                        
                    </ListGroup.Item>
                ))}
            </ListGroup>
         
        </div>
    );
}

export default withRouter(StudentListwAddBtn);
