import { Box, Container, Paper, Input, InputLabel, Typography, Grid, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
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

function AddImages () {

    let { id } = useParams();

    // Tilamuuttuja tuotteen tiedoille ja useState
    const [image, setImage] = useState ({
        img: [],
        assignment_id: id
    });

    // Funktio, jolla muutetaan tilaa
    const changeImageState = (e) => {
        // Asetetaan image-objektiin lomakekentän arvot
        setImage({
            ...image,
            [e.target.name]: e.target.value
        });
    };

    // Funktio, jolla muutetaan kuvaa
    const changeImage = (e) => {
        setImage({
          ...image,
          [e.target.name]: e.target.files[0]
        });
    }

    // Kuvan nimi lomakkeelle
    let imgName = '';
    if (image.img !== null) {
        imgName = image.img.name;
    }

    // Headerit
    let headers = {
        'Authorization': `Basic YWRtaW46cXdlcnR5`,
        'Content-Type': 'application/json'
    };

    const navigate = useNavigate();   

    const saveImage = async () => {
        if ( image.assignment_id.length > 0 && image.img.length == null ) {
            const formData = new FormData();
            formData.append('file', image.img);
            try {
                const response = await axios.post('https://sharecraft.herokuapp.com/images/' + image.assignment_id, formData, { headers: headers });
                setImage({
                    img: [],
                    assignment_id: id
                });
                console.log(headers);
                console.log(response);
                // const assignmentId = response.data.assignment_id;
                // console.log(assignmentId);
                // navigate('/');
            } catch (error) {
                setImage('');
                console.log(error);
            }
        } else {
            console.log("Fill all form data");
        }
    }

    return (
        <Box sx={{minHeight: '100vh'}}>
            <Container sx={{ maxWidth: 'lg', padding: 3 }}>
                <Typography variant='h2' sx={{ my: 3, textAlign: 'center' }}>Lisää kuvia.</Typography>
                <Typography variant= "body2" sx={{ mb: 5, mt: 3, fontSize: '1.2rem' }}>Vaihe 3: Viimeistele työohje ja lisää tarvittavat kuvat.</Typography>
                <Paper sx={{ p: 6, m: 3, borderRadius: '7px' }}>
                    <Box component='form'>
                        <Grid container spacing={{ xs: 2, md: 3 }}>
                            <Grid item xs={12} sm={9}>
                                <TextField name="assignment_id" value={ image.assignment_id } sx={{display: 'none'}} onChange={ (e) => changeImageState(e) } autoFocus fullWidth/>
                                <Input accept='image/*' name='img' type='file' id='image' onChange={ changeImage } style={ {display: 'none'} } />
                                <InputLabel htmlFor='image'>
                                        <Typography display='inline' sx={{ mr: 2 }}>Add Image:</Typography>
                                        <Button component='span' sx={{ mr: 2 }}><AddAPhotoIcon /></Button>
                                        <Typography display='inline'>{ imgName }</Typography>
                                    </InputLabel> 
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Box sx={{ marginLeft: "auto", display: "flex", flexDirection: 'row-reverse' }}>
                                    <Button size="small" sx={ sendButton } onClick={ saveImage } variant="contained" color="info">Lisää</Button>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                            <Box sx={{ marginLeft: "auto", display: "flex", flexDirection: 'row-reverse' }}>
                                <Box>
                                    <Button size="small" sx={ cancelButton } onClick={() => navigate('/')} variant="contained">Peruuta</Button>
                                    <Button size="small" sx={ nextButton } onClick={() => navigate('/')} variant="contained" color="info">Valmis</Button>
                                    
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

export default AddImages;