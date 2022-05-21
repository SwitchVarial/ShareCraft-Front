import { Box, Container, Paper, Typography, Grid, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const sendButton = {
    color: 'primary.main',
    backgroundColor: 'secondary.main',
    border: 2,
    borderColor: 'secondary.main',
    borderRadius: '20px',
    minWidth: '100%',
    ml: 2,
    px: 3,
    "&:hover": {
        border: 2,
        backgroundColor: 'primary.main',
        borderColor: 'primary.main',
        color: 'secondary.main',
    }
}

const nextButton = {
    color: 'common.white',
    backgroundColor: 'primary.main',
    border: 2,
    borderColor: 'primary.main',
    borderRadius: '20px',
    ml: 2,
    px: 3,
    "&:hover": {
        border: 2,
        backgroundColor: 'secondary.main',
        borderColor: 'secondary.main',
        color: 'primary.main',
    }
}

const cancelButton = {
    color: 'primary.main',
    backgroundColor: 'common.white',
    px: 3,
    border: 2,
    borderRadius: '20px',
    "&:hover": {
        backgroundColor: 'primary.main',
        color: 'common.white',
        border: 2,
        borderColor: 'primary.main'
    }
}

function AddMaterials () {

    let { id } = useParams();

    // Tilamuuttuja tuotteen tiedoille ja useState
    const [material, setMaterial] = useState ({
        description: '',
        assignment_id: id
    });

    // Funktio, jolla muutetaan tilaa
    const changeMaterialState = (e) => {
        // Asetetaan product-objektiin lomakekentän arvot
        setMaterial({
            ...material,
            [e.target.name]: e.target.value
        });
    };

    // Headerit
    let headers = {
        'Authorization': `Basic YWRtaW46cXdlcnR5`,
        'Content-Type': 'application/json'
    };

    const navigate = useNavigate();   

    const saveMaterial = async () => {
        if ( material.description.length > 0 ) {
            const data = {
                'description': material.description,
                'assignment_id': parseInt(material.assignment_id),
            }
            const json = JSON.stringify(data);
            console.log(json);
            try {
                const response = await axios.post('http://localhost:8080/materials', json, { headers: headers });
                setMaterial({
                    description: '',
                    assignment_id: id
                });
                console.log(headers);
                console.log(response);
                // const assignmentId = response.data.assignment_id;
                // console.log(assignmentId);
                // navigate('/');
            } catch (error) {
                setMaterial('');
                console.log(error);
            }
        } else {
            console.log("Fill all form data");
        }
    }

    return (
        <Box sx={{minHeight: '100vh'}}>
            <Container sx={{ maxWidth: 'lg', padding: 3 }}>
                <Typography variant='h2' sx={{ my: 3, textAlign: 'center' }}>Lisää materiaalit ja työvälineet.</Typography>
                <Typography variant= "body2" sx={{ mb: 5, mt: 3, fontSize: '1.2rem' }}>Vaihe 2: Lisää työhon tavittavat materiaalit ja tarvikkeet.</Typography>
                <Paper sx={{ p: 6, m: 3, borderRadius: '7px' }}>
                    <Box component='form'>
                        <Grid container spacing={{ xs: 2, md: 3 }}>
                            <Grid item xs={12} sm={9}>
                            <TextField name="assignment_id" value={ material.assignment_id } sx={{display: 'none'}} onChange={ (e) => changeMaterialState(e) } autoFocus fullWidth/>
                                <TextField label="Materiaalin Kuvaus" name="description" value={ material.description } onChange={ (e) => changeMaterialState(e) } autoFocus fullWidth/>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Box sx={{ marginLeft: "auto", display: "flex", flexDirection: 'row-reverse' }}>
                                    <Button size="small" sx={ sendButton } onClick={ saveMaterial } variant="contained" color="info">Lisää</Button>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                            <Box sx={{ marginLeft: "auto", display: "flex", flexDirection: 'row-reverse' }}>
                                <Box>
                                    <Button size="small" sx={ cancelButton } onClick={() => navigate('/')} variant="contained">Peruuta</Button>
                                    <Button size="small" sx={ nextButton } onClick={() => navigate('/lisaa-kuvat/' + material.assignment_id)} variant="contained" color="info">Seuraava</Button>
                                    
                                </Box>
                            </Box>
                            </Grid>   
                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </Box>
    )
}

export default AddMaterials;