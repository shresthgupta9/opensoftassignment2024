import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Typography, Box, TextField, Button, Link, Paper } from '@mui/material';
import axios from 'axios';

const isUsername = (uname) => /^[a-z][a-z0-9]*$/.test(uname) && uname.length >= 5 && uname.length <= 15;
const isPassword = (pword) => pword.length >= 8 && pword.length <= 20;

const LogIn = () => {
    const navigate = useNavigate();
    const [uname, setUname] = useState("");
    const [pword, setPword] = useState("");
    const [submittedData, setSubmittedData] = useState({});
    const [usernameError, setUsernameError] = useState(true);
    const [passwordError, setPasswordError] = useState(true);
    const [initialError, setInitialError] = useState(0);
    const [loginErr, setLoginErr] = useState(false);

    const handleUname = (e) => setUname(e.target.value);
    const handlePword = (e) => setPword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPasswordError(!isPassword(pword) ? true : false);
        setUsernameError(!isUsername(uname) ? true : false);
        setInitialError(initialError + 1) // for setting error to false initially in TextField
        const data = { username: uname, password: pword };
        setSubmittedData(data);
    };

    async function submitFn(submittedData) {
        try {
            const jsonData = JSON.stringify(submittedData);
            const response = await axios.post('http://127.0.0.1:8000/api/auth/jwt/create/', jsonData, {
                headers: { 'Content-Type': 'application/json' }
            });
            const accessToken = response.data.access;
            const refreshToken = response.data.refresh;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            return navigate("/welcome");
        } catch (error) {
            setLoginErr(true);
            setUname("");
            setPword("");
            console.log(error);
        }
    }

    useEffect(() => {
        function check() {
            if (!usernameError && !passwordError) {
                submitFn(submittedData);
            }
        }
        check();
    }, [usernameError, passwordError, submittedData])

    return (
        <>
            <Container maxWidth="xs" sx={{ alignItems: 'center' }}>
                <Paper elevation={3} sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 3,
                }}>
                    <Typography component="h1" variant="h5"> Log In </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            error={initialError === 0 ? false : usernameError}
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            value={uname}
                            onChange={handleUname}
                            autoComplete="username"
                            autoFocus
                            helperText={"Must be only lowercase letters and numbers"}
                            FormHelperTextProps={{
                                style: { visibility: (initialError === 0 ? false : usernameError) ? 'visible' : 'hidden' },
                            }}
                        />
                        <TextField
                            error={initialError === 0 ? false : passwordError}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={pword}
                            onChange={handlePword}
                            autoComplete="current-password"
                            helperText={"Password must be between 8 and 20 characters"}
                            FormHelperTextProps={{
                                style: { visibility: (initialError === 0 ? false : passwordError) ? 'visible' : 'hidden' },
                            }}
                        />
                        <Box sx={{ marginTop: 1 }}> <Link href="/signup" variant="body2"> {"Don't have an account? Sign Up"} </Link> </Box>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} > Log In </Button>
                    </Box>
                </Paper>
                <Box>{loginErr && <Typography component='h6' sx={{ marginTop: 2, textAlign: 'center' }}>
                    Invalid Username or Password</Typography>}
                </Box>
            </Container>
        </ >
    )
}

export default LogIn;