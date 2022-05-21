import React, { useState } from "react";
import { Button, Box, Grid, Typography, TextField, Container } from "@mui/material";
import axios from 'axios';
import bcrypt from 'bcryptjs';

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

function SignUp() {

    // Account ja useState
    const [account, setAccount] = useState ({
        first_name: '',
        last_name: '',
        passwordHash: '',
        email: '',
        active: true,
        created_date: new Date().toISOString(),
        role: 'Teacher'
    });

    // Funktio, jolla muutetaan tilaa
    const changeAccountState = (e) => {
        // Asetetaan product-objektiin lomakekentän arvot
        setAccount({
            ...account,
            [e.target.name]: e.target.value
        });
    };

    // Funktio Submit-napin painallukselle
    const addAccount = async (e) => {
        if ( account.first_name.length > 0 && account.last_name.length > 0 && account.email.length > 0 && account.passwordHash.length > 0) {
            const data = {
                first_name: account.first_name,
                last_name: account.last_name,
                username: account.email,
                passwordHash: bcrypt.hashSync(account.passwordHash, bcrypt.genSaltSync(10)),
                email: account.email,
                active: account.active,
                created_date: account.created_date,
                role: account.role
            };
            const json = JSON.stringify(data);
            console.log(json);
            try {
                const response = await axios.post('http://localhost:8080/signup', json, { headers: { 'Content-Type': 'application/json'}});
                setAccount({first_name:'', last_name:'', username:'', passwordHash:'', email:'', active: true, role: 'Teacher'})
                console.log(response.data);
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
                <Typography variant='h2' sx={{ my: 3, textAlign: 'center', color: 'primary.main' }}>Liity mukaan</Typography>
                <Typography variant= "body2" sx={{ mb: 5, mt: 3, fontSize: '1.2rem' }}>Jaa omat tehtäväsi ja hyödynnä muiden suunnittelemia tehtäviä opetuksessasi. Littymällä voit jakaa omia tehtäviäsi.</Typography>
                <Box component='form' sx={ formStyle } variant="filled">
                    <Grid container spacing={{ xs: 2, md: 3 }}>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Etunimi" name="first_name" value={ account.first_name } onChange={ (e) => changeAccountState(e) } autoFocus fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Sukunimi" name="last_name" value={ account.last_name } onChange={ (e) => changeAccountState(e) } fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Sähköpostiosoite" name="email" value={ account.email } onChange={ (e) => changeAccountState(e) } fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Salasana" type="password" name="passwordHash" value={ account.passwordHash } onChange={ (e) => changeAccountState(e) } fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                                <Button sx={ sendButton } onClick={ (e) => addAccount(e) } variant="contained" color="info">Liity mukaan</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
             </Container>
        </Box>
    )

}

export default SignUp;