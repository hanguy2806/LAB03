import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function ShowStudent(props) {
    const [data, setData] = useState({});
    const [showLoading, setShowLoading] = useState(true);
    const [error, setError] = useState('');
    const apiUrl = 'http://localhost:3000/students/' + props.match.params.id;

    useEffect(() => {
        setShowLoading(false);
        const fetchData = async () => {
            const result = await axios(apiUrl);
            setData(result.data);
            setShowLoading(false);
        };

        fetchData();
    }, []);

    const editStudent = (id) => {
        props.history.push({
            pathname: '/editStudent/' + id,
        });
    };

    const deleteStudent = (id) => {
        setShowLoading(true);
        const user = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            username: data.username,
            password: data.password,
        };

        axios
            .delete(apiUrl, user)
            .then((result) => {
                setShowLoading(false);
                if (result.data.screen === 'auth') {
                    setError(
                        'Delete failed: Deleting Requires Logging in as the profile owner'
                    );
                } else {
                    props.history.push('/listStudents');
                    deleteCookie();
                }
            })
            .catch((error) => {
                setError(
                    'Delete failed: Only Student Profile owner can delete a student.'
                );
                setShowLoading(false);
            });

        // automatically signout student after delete profile
        const deleteCookie = async () => {
            try {
                await axios.get('/signout');
            } catch (e) {
                console.log(e);
            }
        };
    };

    return (
        <div>
            {showLoading && (
                <Spinner animation='border' role='status'>
                    <span className='sr-only'>Loading...</span>
                </Spinner>
            )}
            <Jumbotron>
                <h1>
                    {data.firstName} {data.lastName}
                </h1>
                <hr />
                <p>Student Number: {data.studentNumber}</p>
                <p>Email: {data.email}</p>
                <p>Address: {data.address}</p>
                <p>City: {data.city}</p>
                <p>Phone Number: {data.phoneNumber}</p>
                <p>Program: {data.program}</p>

                <p>
                    <Button
                        type='button'
                        variant='warning'
                        onClick={() => {
                            editStudent(data._id);
                        }}>
                        Edit Student
                    </Button>
                    &nbsp;
                    <Button
                        type='button'
                        variant='danger'
                        onClick={() => {
                            deleteStudent(data._id);
                        }}>
                        Delete Student
                    </Button>
                </p>
                {error ? <h6>{error}</h6> : <h6></h6>}
            </Jumbotron>
        </div>
    );
}

export default withRouter(ShowStudent);
