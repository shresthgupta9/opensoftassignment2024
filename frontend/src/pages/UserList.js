import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NotAuthorized from "../components/NotAuthorized";
import { Box, Container, Paper, Typography, Grid } from "@mui/material";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from 'date-fns';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
}));
const lightTheme = createTheme({ palette: { mode: 'light' } });

const formatDate = (date) => {
    const parsedDate = new Date(date);
    const formattedDate = format(parsedDate, 'do MMMM yyyy');
    return formattedDate;
}

const UserList = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [allUsers, setAllUsers] = useState([]);

    const retrieve = async () => {
        const token = localStorage.getItem('accessToken');
        const headers = { Authorization: `JWT ${token}` };
        if (token !== null) {
            try {
                setIsAuthenticated(true);
                await axios.get("http://127.0.0.1:8000/api/allusers/", { headers }).then(response => {
                    setAllUsers(response.data);
                })
            } catch (error) {
                setIsAuthenticated(false);
                console.log(error);
            }
        }
    };

    useEffect(() => {
        retrieve();
    }, [])

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
                    <Container maxWidth="xs">
                        <Typography component="h1" variant="h3" sx={{ marginTop: 4, textAlign: "center", }}>
                            All Users
                        </Typography>
                        <Grid container>
                            <Grid item xs={12}>
                                <ThemeProvider theme={lightTheme}>
                                    <Box
                                        sx={{
                                            p: 2,
                                            borderRadius: 2,
                                            bgcolor: 'background.default',
                                            display: 'grid',
                                            gridTemplateColumns: { md: '1fr' },
                                            gap: 7,
                                            marginTop: 3,
                                        }}
                                    >
                                        {allUsers.map((user) => {
                                            return (
                                                user.is_active && (<Item key={user.id} elevation={3}
                                                    sx={{
                                                        paddingY: 1,
                                                        height: "auto",
                                                        color: "black"
                                                    }}
                                                >
                                                    <Typography> Name - {user.first_name + " " + user.last_name} </Typography>
                                                    <Typography> Username - {user.username} </Typography>
                                                    <Typography> Email - {user.email} </Typography>
                                                    <Typography> Date Joined - {formatDate(user.date_joined)} </Typography>
                                                </Item>))
                                        })}
                                    </Box>
                                </ThemeProvider>
                            </Grid>
                        </Grid>
                    </Container>
                    <Footer />
                </Box >
                : <NotAuthorized />}
        </>
    )
}

export default UserList