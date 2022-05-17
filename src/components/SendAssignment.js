import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Box, TextField, Button, Container, Typography, Grid } from '@mui/material';

const formStyle = {
    backgroundColor: 'common.white',
    p: 3,
}

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

function ShareAssignment (props) {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_55tc7ro', 'template_gr5yd46', form.current, 'kBP0qR5IZNpZikW7e')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
    };

    return (
        <Box>
            <Container sx={{ maxWidth: 'lg', padding: 3 }}>
                <Typography variant='h2' sx={{ my: 3, textAlign: 'center', color: 'primary.main' }}>Jaa ohje</Typography>
                <Typography variant= "body2" sx={{ mb: 5, mt: 3, fontSize: '1.2rem' }}>Jaa opettamisen ilo ja rohkaise oppilaita tekemään itse. Täältä voit jakaa ohjeen sijaiselle tai kollegalle!</Typography>
                <Box component='form' ref={form} sx={ formStyle } variant="filled" onSubmit={sendEmail}>
                    <Grid container spacing={{ xs: 2, md: 3 }}>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Lähettäjän nimi" name="from_name" autoFocus fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Lähettäjän sähköpostiosoite" name="reply_to" fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Vastaanottajan nimi" name="to_name" fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Vastaanottajan sähköpostiosoite" name="send_to" fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Aihe" name="subject" fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField disabled label="Linkki" name="link" value={ props.link } fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Viesti" name="message" multiline rows='11' fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                                <Button sx={ sendButton } type="submit" value="Send" variant="contained" color="info">Lähetä</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    )
}

export default ShareAssignment;