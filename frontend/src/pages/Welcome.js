import { React, useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NotAuthorized from '../components/NotAuthorized';
import { Container, Box, Typography } from '@mui/material';
import axios from 'axios';

const Welcome = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [fname, setFname] = useState("");

    const retrieve = async () => {
        const token = localStorage.getItem('accessToken');
        const headers = { Authorization: `JWT ${token}` };
        if (token !== null) {
            try {
                setIsAuthenticated(true);
                await axios.get("http://127.0.0.1:8000/api/auth/users/me/", { headers }).then(response => {
                    setFname(response.data.first_name);
                })
            } catch (error) {
                setIsAuthenticated(false);
                console.log(error);
            }
        }
    };

    useEffect(() => {
        retrieve();
    }, []);
    return (
        <>
            {isAuthenticated ?
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100vh',
                    }}
                >
                    <Navbar />
                    <Container sx={{ marginTop: 3, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <Typography variant='h3' component='h4'> Hello {fname} </Typography>
                        <Typography variant='h3' component='h4'> Welcome to Dashboard :D</Typography>
                    </Container>
                    <Footer />
                </Box > :
                <NotAuthorized />}
        </>
    )
}

export default Welcome;