import React, { useState } from "react";
import { Button, Box, Grid, Typography, TextField, Container } from "@mui/material";
import axios from 'axios';

    const sendButton = {
        color: 'common.white',
        backgroundColor: 'primary.main',
        borderRadius: '20px',
        mr: 0,
        mb: 3,
        px: 3,
        "&:hover": {
            backgroundColor: 'secondary.main',
            color: 'primary.main',
        }
    }

    const formStyle = {
        backgroundColor: 'common.white',
        p: 3,
    }

function SignIn({ setToken }) {

    // Account ja useState
    const [signIn, setSignIn] = useState ({
        username: '',
        password: ''
    });

    // Funktio, jolla muutetaan tilaa
    const changeSignInState = (e) => {
        // Asetetaan product-objektiin lomakekentän arvot
        setSignIn({
            ...signIn,
            [e.target.name]: e.target.value
        });
    };

    // Funktio Submit-napin painallukselle
    const UserSignIn = async (e) => {
        if ( signIn.username.length > 0 && signIn.password.length > 0) {
            const data = {
                username: signIn.username,
                passwordHash: signIn.password
            };
            const json = JSON.stringify(data);
            console.log(json);
            try {
                const response = await axios.post('https://sharecraft.herokuapp.com/signin', json, { headers: { 'Content-Type': 'application/json'}});
                setSignIn({username:'', password:''})
                console.log(response);
                setToken(response.data);
            } catch (error) {
                console.log(error);                
            }
        } else {
            // Näytetöön error snackbar
            console.log('Täytä kaikki tiedot');
        }
    }

    return (
        <Box>
            <Container sx={{ maxWidth: 'lg', padding: 3 }}>
                <Typography variant='h2' sx={{ my: 3, textAlign: 'center', color: 'primary.main' }}>Kirjaudu sisään</Typography>
                <Typography variant= "body2" sx={{ mb: 5, mt: 3, fontSize: '1.2rem' }}>Tervetuloa takaisin!</Typography>
                <Box component='form' sx={ formStyle } variant="filled">
                    <Grid container spacing={{ xs: 2, md: 3 }}>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Käyttäjätunnus" name="username" value={ signIn.username } onChange={ (e) => changeSignInState(e) } autoFocus fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Salasana" type="password" name="password" value={ signIn.password } onChange={ (e) => changeSignInState(e) } fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                                <Button sx={ sendButton } onClick={ (e) => UserSignIn(e) } variant="contained" color="info">Kirjaudu</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
             </Container>
        </Box>
    )

}

export default SignIn;