import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NotAuthorized from '../components/NotAuthorized';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const Delete = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pass, setPass] = useState("");
    const [show, setShow] = useState(false);

    const handleChange = (e) => setPass(e.target.value);

    const check = () => {
        const token = localStorage.getItem('accessToken');
        if (token !== null) setIsAuthenticated(true);
    }

    const handleSubmit = async () => {
        const token = localStorage.getItem('accessToken');
        const headers = {
            'Content-Type': 'application/json',
            "Authorization": `JWT ${token}`
        };
        const data = {
            current_password: pass
        }
        try {
            await axios.delete('http://127.0.0.1:8000/api/auth/users/me/', {
                headers: headers,
                data: data
            });
            navigate("/signup");
        } catch (error) {
            setShow(true);
            console.log(error);
        }
    }

    useEffect(() => {
        check();
    }, [])
    return (
        <>
            {isAuthenticated ?
                <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 5 }} >
                    <TextField
                        label="Enter Your Password"
                        variant="outlined"
                        value={pass}
                        onChange={handleChange}
                        sx={{ marginY: 1 }}
                        type="password"
                    />
                    <Button variant="outlined" color="error" size="large" onClick={handleSubmit} sx={{ marginY: 1 }}> Submit </Button>
                    {show && <Typography> Incorrect Password </Typography>}
                </Container>
                : <NotAuthorized />}
        </>
    )
}

export default Delete