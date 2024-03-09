import { Box, Typography, Container, Link, CssBaseline } from '@mui/material';

function Copyright() {
    return (
        <Typography variant="body1">
            {'Copyright © '}
            <Link color="inherit" href="http://localhost:3000/"> Dashboard </Link>
            {' '}
            {new Date().getFullYear()}
            <br />
            {'All Rights Reserved'}
        </Typography>
    );
}

export default function StickyFooter() {
    return (
        <>
            <CssBaseline />
            <Box
                component="footer"
                sx={{
                    py: 2,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: "#1976d2",
                    color: "white",
                    textAlign: "center",
                }}
            >
                <Container maxWidth="sm"> <Copyright /> </Container>
            </Box>
        </>
    );
}