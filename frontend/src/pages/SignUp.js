import { Container, Typography, Box, TextField, Button, Link, Stack, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

const isFname = (fname) => fname.length >= 3 && fname.length <= 15;
const isLname = (lname) => lname.length >= 3 && lname.length <= 15;
const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
const isUname = (uname) => /^[a-z][a-z0-9]*$/.test(uname) && uname.length >= 5 && uname.length <= 15;
const isPword = (pword1, pword2) => pword1.length >= 8 && pword1.length <= 20 && pword2.length >= 8 && pword2.length <= 20 && (pword1 === pword2);

const SignUp = () => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [uname, setUname] = useState("");
    const [pword, setPword] = useState("");
    const [pword2, setPword2] = useState("");

    const [fnameError, setFnameError] = useState(true);
    const [lnameError, setLnameError] = useState(true);
    const [emailError, setEmailError] = useState(true);
    const [unameError, setUnameError] = useState(true);
    const [pwordError, setPwordError] = useState(true);
    const [initialError, setInitialError] = useState(0);
    const [submittedData, setSubmittedData] = useState({});

    const [showAlert, setShowAlert] = useState(false);
    const [alertData, setAlertData] = useState("");

    const handleFname = (e) => setFname(e.target.value);
    const handleLname = (e) => setLname(e.target.value);
    const handleUname = (e) => setUname(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePword = (e) => setPword(e.target.value);
    const handlePword2 = (e) => setPword2(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();

        setFnameError(!isFname(fname));
        setLnameError(!isLname(lname));
        setEmailError(!isEmail(email));
        setUnameError(!isUname(uname));
        setPwordError(!isPword(pword, pword2));
        setInitialError(initialError + 1) // for setting error to false initially in TextField

        const user = { first_name: fname, last_name: lname, email: email, username: uname, password: pword, re_password: pword2 };
        setSubmittedData(user);
    };

    async function submitFn(submittedData) {
        try {
            const jsonData = JSON.stringify(submittedData);
            await axios.post('http://127.0.0.1:8000/api/auth/users/', jsonData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setFname("");
            setLname("");
            setUname("");
            setEmail("");
            setPword("");
            setPword2("");
            setShowAlert(true);
            setAlertData("Please check your email");
        } catch (error) {
            console.log(error);
            setShowAlert(true);
            setAlertData(
                error.response.data.username ? "Username already exists" : "Invalid data"
            );
        }
    }

    useEffect(() => {
        if (!fnameError && !lnameError && !emailError && !unameError && !pwordError) {
            submitFn(submittedData);
        }
    }, [fnameError, lnameError, emailError, unameError, pwordError, submittedData])

    return (
        <Container maxWidth="xs" sx={{ alignItems: 'center' }}>
            <Paper elevation={3} sx={{
                marginTop: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 3,
            }}>
                <Typography component="h1" variant="h5"> Sign Up </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Stack direction="row" spacing={2}>
                        <TextField
                            error={initialError === 0 ? false : fnameError}
                            margin="dense"
                            required
                            fullWidth
                            id="fname"
                            label="First Name"
                            value={fname}
                            name="fname"
                            onChange={handleFname}
                            autoComplete="fname"
                            autoFocus
                            size='small'
                            helperText={"Between 3 and 15 chars"}
                            FormHelperTextProps={{
                                style: { visibility: (initialError === 0 ? false : fnameError) ? 'visible' : 'hidden' },
                            }}
                        />
                        <TextField
                            error={initialError === 0 ? false : lnameError}
                            margin="dense"
                            required
                            fullWidth
                            id="lname"
                            label="Last Name"
                            name="lname"
                            value={lname}
                            onChange={handleLname}
                            autoComplete="lname"
                            size='small'
                            helperText={'Between 3 and 15 chars'}
                            FormHelperTextProps={{
                                style: { visibility: (initialError === 0 ? false : lnameError) ? 'visible' : 'hidden' },
                            }}
                        />
                    </Stack>
                    <TextField
                        error={initialError === 0 ? false : emailError}
                        margin="dense"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={email}
                        onChange={handleEmail}
                        autoComplete="email"
                        size='small'
                        helperText={'Enter a valid email address'}
                        FormHelperTextProps={{
                            style: { visibility: (initialError === 0 ? false : emailError) ? 'visible' : 'hidden' },
                        }}
                    />
                    <TextField
                        error={initialError === 0 ? false : unameError}
                        margin="dense"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        value={uname}
                        onChange={handleUname}
                        autoComplete="username"
                        size='small'
                        helperText={'Must be only lowercase letters and numbers'}
                        FormHelperTextProps={{
                            style: { visibility: (initialError === 0 ? false : unameError) ? 'visible' : 'hidden' },
                        }}
                    />
                    <TextField
                        error={initialError === 0 ? false : pwordError}
                        margin="dense"
                        required
                        fullWidth
                        name="password1"
                        label="Password"
                        type="password"
                        id="password1"
                        value={pword}
                        onChange={handlePword}
                        autoComplete="current-password"
                        size='small'
                        helperText={'Password must be between 8 and 20 characters'}
                        FormHelperTextProps={{
                            style: { visibility: (initialError === 0 ? false : pwordError) ? 'visible' : 'hidden' },
                        }}
                    />
                    <TextField
                        error={initialError === 0 ? false : pwordError}
                        margin="dense"
                        required
                        fullWidth
                        name="password2"
                        label="Retype Password"
                        type="password"
                        id="password2"
                        value={pword2}
                        onChange={handlePword2}
                        autoComplete="current-password"
                        size='small'
                        helperText={'Password must be between 8 and 20 characters'}
                        FormHelperTextProps={{
                            style: { visibility: (initialError === 0 ? false : pwordError) ? 'visible' : 'hidden' },
                        }}
                    />
                    <Box sx={{ marginTop: 1 }}> <Link href="/login" variant="body2"> {"Already have an account? Log In"} </Link> </Box>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} > Sign Up </Button>
                </Box>
            </Paper>
            <Box>{showAlert && <Typography component='h6' sx={{ marginTop: 2, textAlign: 'center' }}> {alertData} </Typography>} </Box>
        </Container>
    )
}

export default SignUp;
