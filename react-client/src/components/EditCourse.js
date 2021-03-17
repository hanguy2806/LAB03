import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function EditCourse(props) {
    console.log('edit course props:', props.match.params);
    const [course, setCourse] = useState({ _id: '', title: '', content: '' });
    const [showLoading, setShowLoading] = useState(true);
    const [error, setError] = useState('');
    const apiUrl = 'http://localhost:3000/api/courses/' + props.match.params.id;
    //runs only once after the first render
    useEffect(() => {
        setShowLoading(false);
        //call api
        const fetchData = async () => {
            const result = await axios(apiUrl);
            setCourse(result.data);
            console.log(result.data);
            setShowLoading(false);
        };

        fetchData();
    }, []);

    const updateCourse = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const data = {
            section: course.section,
            semester: course.semester,
            courseCode: course.courseCode,
            courseName: course.courseName,
        };
        axios
            .put(apiUrl, data)
            .then((result) => {
                console.log('after calling put to update', result.data);
                setShowLoading(false);
                if(result.data.screen === 'auth'){
                  setError('Update failed: Updating Requires Logging in as the course owner');
                }
                else{
                  props.history.push('/showcourse/' + result.data._id);
                }
            })
            .catch((error) => {
                setError(
                    'Update failed: Only Course owner can update a course'
                );
                setShowLoading(false);
            });
    };
    //runs when user enters a field
    const onChange = (e) => {
        e.persist();
        setCourse({ ...course, [e.target.name]: e.target.value });
    };

    return (
        <div>
            {showLoading && (
                <Spinner animation='border' role='status'>
                    <span className='sr-only'>Loading...</span>
                </Spinner>
            )}
            <Jumbotron>
                <Form onSubmit={updateCourse}>
                <h1>Course Code: {course.courseCode} Course Name: {course.courseName}</h1>
                    <Form.Group>
                        <Form.Label> Section</Form.Label>
                        <Form.Control
                            type='text'
                            name='section'
                            id='section'
                            placeholder='Enter section'
                            value={course.section}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> Semester</Form.Label>
                        <Form.Control
                            type='text'
                            name='semester'
                            id='semester'
                            placeholder='Enter semester'
                            value={course.semester}
                            onChange={onChange}
                        />
                    </Form.Group>

                    <Button variant='warning' type='submit'>
                        Update Course
                    </Button>
                    {error ? <h6>{error}</h6> : <h6></h6>}
                </Form>
            </Jumbotron>
        </div>
    );
}

export default withRouter(EditCourse);
