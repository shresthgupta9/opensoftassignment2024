import { Container, Typography } from '@mui/material';

const NotAuthorized = () => {
    return (
        <Container sx={{ marginTop: 3, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            You are not logged in. Please log in with your account
            <Typography component='a' href='http://localhost:3000/login'> Log in </Typography>
        </Container>
    )
}

export default NotAuthorized;