import { Box, Container, Paper, Typography, Grid, TextField, MenuItem, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const sendButton = {
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

function AddAssignment () {

    // Tilamuuttuja tuotteen tiedoille ja useState
    const [assignment, setAssignment] = useState ({
        name: '',
        description: '',
        instructions: '',
        user_id: 1,
        class_level_id: '',
        license_id: '',
    });

    // Funktio, jolla muutetaan tilaa
    const changeAssignmentState = (e) => {
        // Asetetaan product-objektiin lomakekentän arvot
        setAssignment({
            ...assignment,
            [e.target.name]: e.target.value
        });
    };

    // Headerit
    let headers = {
        'Authorization': `Basic YWRtaW46cXdlcnR5`,
        'Content-Type': 'application/json'
    };

    const navigate = useNavigate();   

    const saveAssignment = async () => {
        if ( assignment.name.length > 0 && assignment.description.length > 0 && assignment.instructions.length > 0 ) {
            const data = {
                'name': assignment.name,
                'description': assignment.description,
                'instructions': assignment.instructions,
                'user': {
                    'user_id': assignment.user_id
                },
                'classLevel': {
                    'class_level_id': assignment.class_level_id
                },
                'license': {
                    'license_id': assignment.license_id
                }
            }
            const json = JSON.stringify(data);

            try {
                const response = await axios.post('https://sharecraft.herokuapp.com/assignments/', json, { headers: headers });
                setAssignment({
                    name: '',
                    description: '',
                    instructions: '',
                    user_id: 1,
                    class_level_id: 1,
                    license_id: 1
                });
                console.log(headers);
                console.log(response);
                const assignmentId = response.data.assignment_id;
                console.log(assignmentId);
                navigate('/lisaa-materiaalit/' + assignmentId);
            } catch (error) {
                setAssignment('');
                console.log(error);
            }
        } else {
            console.log("Fill all form data");
        }
    }

    return (
        <Box sx={{minHeight: '100vh'}}>
            <Container sx={{ maxWidth: 'lg', padding: 3 }}>
                <Typography variant='h2' sx={{ my: 3, textAlign: 'center' }}>Lisää uusi tehtävä</Typography>
                <Typography variant= "body2" sx={{ mb: 5, mt: 3, fontSize: '1.2rem' }}>Vaihe 1: Lisää tehtävän tiedot ja valitse Creative Common -lisenssi.</Typography>
                <Paper sx={{ p: 6, m: 3, borderRadius: '7px' }}>
                    <Box component='form'>
                        <Grid container spacing={{ xs: 2, md: 3 }}>
                            <Grid item xs={12}>
                                <TextField label="Tehtävän nimi" name="name" value={ assignment.name } onChange={ (e) => changeAssignmentState(e) } autoFocus fullWidth/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="class_level_id"
                                    name="class_level_id"
                                    value={ assignment.class_level_id }
                                    label="Luokkataso"
                                    onChange={ (e) => changeAssignmentState(e) } select fullWidth>
                                    <MenuItem key={1} value={ 1 }>Luokat 1-2</MenuItem>
                                    <MenuItem key={2} value={ 2 }>Luokat 3-4</MenuItem>
                                    <MenuItem key={3} value={ 3 }>Luokat 5-6</MenuItem>
                                    <MenuItem key={4} value={ 4 }>Luokat 7-8</MenuItem>
                                    <MenuItem key={5} value={ 5 }>Luokka 9</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="license_id"
                                    name="license_id"
                                    value={ assignment.license_id }
                                    label="Lisenssi"
                                    onChange={ (e) => changeAssignmentState(e) } select fullWidth>
                                    <MenuItem key={1} value={ 1 }>Attribution 4.0 International</MenuItem>
                                    <MenuItem key={2} value={ 2 }>Attribution-NoDerivatives 4.0 International</MenuItem>
                                    <MenuItem key={3} value={ 3 }>Attribution-ShareAlike 4.0 International</MenuItem>
                                    <MenuItem key={4} value={ 4 }>Attribution-NonCommercial 4.0 International</MenuItem>
                                    <MenuItem key={5} value={ 5 }>Attribution-NonCommercial-NoDerivatives 4.0 International</MenuItem>
                                    <MenuItem key={6} value={ 6 }>Attribution-NonCommercial-ShareAlike 4.0 International</MenuItem>
                                    <MenuItem key={7} value={ 7 }>Public Domain</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Kuvaus" name="description" value={ assignment.description } onChange={ (e) => changeAssignmentState(e) } fullWidth/>
                            </Grid> 
                            <Grid item xs={12}>
                            <TextField label="Työohjeet" name="instructions" value={ assignment.instructions } onChange={ (e) => changeAssignmentState(e) } multiline rows='11' fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                            <Box sx={{ marginLeft: "auto", display: "flex", flexDirection: 'row-reverse' }}>
                                <Box>
                                    <Button size="small" sx={ cancelButton } onClick={() => navigate(-1)} variant="contained">Peruuta</Button>
                                    <Button size="small" sx={ sendButton } onClick={ saveAssignment } variant="contained" color="info">Seuraava</Button>
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

export default AddAssignment;