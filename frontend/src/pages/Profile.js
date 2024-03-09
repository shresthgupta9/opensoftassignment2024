import * as React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NotAuthorized from "../components/NotAuthorized";
import { Container, Typography, Paper, Box, Stack, TextField, Button, Backdrop } from "@mui/material";
import { format } from 'date-fns';
import axios from 'axios';

const typoStyles = (props) => {
    const { px = 6, color = "#424242" } = props || {};
    return {
        px: ((window.innerWidth < 768) ? 1 : px),
        color
    };
};

const isFname = (fname) => fname.length >= 3 && fname.length <= 15;
const isLname = (lname) => lname.length >= 3 && lname.length <= 15;
const formatDate = (date) => {
    const parsedDate = new Date(date);
    const formattedDate = format(parsedDate, 'do MMMM yyyy');
    return formattedDate;
}

const Profile = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [uname, setUname] = useState("");
    const [email, setEmail] = useState("");
    const [dateJoined, setDateJoined] = useState("");
    const [initialErr, setInitialErr] = useState(0);
    const [fnameErr, setFnameErr] = useState(true);
    const [lnameErr, setLnameErr] = useState(true);
    const [content, setContent] = useState("");
    const handleFname = (e) => setFname(e.target.value);
    const handleLname = (e) => setLname(e.target.value);

    const retrieve = async () => {
        const token = localStorage.getItem('accessToken');
        const headers = { Authorization: `JWT ${token}` };
        if (token !== null) {
            try {
                setIsAuthenticated(true);
                await axios.get("http://127.0.0.1:8000/api/auth/users/me/", { headers }).then(response => {
                    setFname(response.data.first_name);
                    setLname(response.data.last_name);
                    setUname(response.data.username);
                    setEmail(response.data.email);
                    setDateJoined(formatDate(response.data.date_joined));
                })
            } catch (error) {
                setIsAuthenticated(false);
                console.log(error)
            }
        }
    };

    const handleUpdate = () => {
        setInitialErr(initialErr + 1);
        setFnameErr(!isFname(fname));
        setLnameErr(!isLname(lname));
    }

    async function handlePatch() {
        const token = localStorage.getItem('accessToken');
        const headers = { 'Authorization': `JWT ${token}`, 'Content-Type': 'application/json' };
        const data = {
            first_name: fname,
            last_name: lname,
        }
        try {
            const jsonData = JSON.stringify(data);
            await axios.patch('http://127.0.0.1:8000/api/auth/users/me/', jsonData, { headers });
            setContent("Profile updated successfully");

        } catch (error) {
            console.log(error);
            setContent("Some error happened, Please try again later")
        }
    }

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const handleDelete = async () => {
        navigate("/delete");
    }

    useEffect(() => {
        retrieve();
    }, []);

    useEffect(() => {
        if (!fnameErr && !lnameErr) {
            handlePatch();
        }
    }, [fnameErr, lnameErr])

    return (
        <>
            {isAuthenticated ?
                <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} >

                    <Backdrop
                        sx={{ backgroundColor: 'rgba(0, 0, 0, 0.9);', color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={open}
                        onClick={handleClose}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography sx={{ margin: 1 }}>Are You Sure?</Typography>
                            <Button variant="outlined" color="error" sx={{ margin: 1 }} onClick={handleDelete}> Yes </Button>
                            <Button variant="outlined" color="success" sx={{ margin: 1 }} > No </Button>
                        </Box>
                    </Backdrop>

                    <Navbar />
                    <Container maxWidth="sm">
                        <Typography variant="h6" component="h6" align="center" my={2}> {content} </Typography>
                        <Typography variant="h3" component="h4" align="center" my={5}> Your Info </Typography>
                        <Box my={3}>
                            <Paper elevation={3}>
                                <Stack spacing={2}>
                                    <Typography variant="h6" sx={{ ...typoStyles() }} pt={2}>First Name:
                                        <TextField
                                            variant="standard"
                                            value={fname}
                                            onChange={handleFname}
                                            error={initialErr === 0 ? false : fnameErr}
                                        />
                                    </Typography>
                                    <Typography variant="h6" sx={{ ...typoStyles() }} >Last Name:
                                        <TextField
                                            variant="standard"
                                            value={lname}
                                            onChange={handleLname}
                                            error={initialErr === 0 ? false : lnameErr}
                                        /></Typography>
                                    <Typography variant="h6" sx={{ ...typoStyles() }} >Username: {uname}</Typography>
                                    <Typography variant="h6" sx={{ ...typoStyles() }} >Email: {email}</Typography>
                                    <Typography variant="h6" sx={{ ...typoStyles() }} pb={2}> Date Joined: {dateJoined}</Typography>
                                </Stack>
                            </Paper>
                        </Box>
                        <Box variant="div" display={"flex"} flexDirection={"column"} alignItems={"center"}>
                            <Button variant="outlined" onClick={handleUpdate} size="large" sx={{ marginBottom: 1 }}> Save </Button>
                            <Button variant="outlined" onClick={handleOpen} size="large" color="error" sx={{ marginBottom: 1 }}> Delete Account </Button>
                        </Box>
                    </Container>
                    <Footer />
                </Box > :
                <NotAuthorized />}
        </>
    )
}

export default Profile;