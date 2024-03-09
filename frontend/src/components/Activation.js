import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Activation() {
    const { uid, token } = useParams();
    const [content, setContent] = useState("");

    useEffect(() => {
        try {
            const data = { uid, token };
            axios.post('http://127.0.0.1:8000/api/auth/users/activation/', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                setContent("Verification sucessful. You can close this window.")
            )
        } catch (error) {
            setContent("Some error happened. Please try again later.")
        }
    }, [token, uid])

    return (
        <Container sx={{ marginTop: 4, textAlign: 'center' }}>{content}</Container>
    );
}

export default Activation;
