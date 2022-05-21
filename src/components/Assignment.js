import React, { useEffect, useState, useCallback } from "react";
import { useParams } from 'react-router';
import axios from 'axios';
import { Box, Button, Container, Divider, Grid, IconButton, Modal, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import PrintButton from "./PrintButton";
import CloseIcon from '@mui/icons-material/Close';
import SendAssignment from './SendAssignment';

const assignmentBox = {
    backgroundColor: 'common.white',
    borderRadius: '7px',
    p: 2,
}

const hero = {
    background: "linear-gradient(180deg, rgba(55,160,64,1) 50%, rgba(245,245,245,1) 50%)",
    color: 'common.white',
    mb: 7
}

const heroSubHeader = {
    color: 'secondary.main',
    fontFamily: "'Lora', 'serif'",
    fontWeight: 700,
    fontSize: '1.2rem',
    mb: 3,
    mt: 3,
}

const heroUser = {
    fontWeight: 700,
    fontSize: '1.4rem',
    mb: 5,
    mt: 3,
}

const subHeader = {
    fontWeight: 900,
    textAlign: 'left',
    color: 'primary.main',
    fontSize: '1.2rem',
    display: 'inline',
    mt: 1
}

const materialHeader = {
    fontWeight: 900,
    textAlign: 'left',
    color: 'common.black',
    fontSize: '1.4rem'
}

const shareButton = {
    ml: 2,
    mr: 0,
    my: 0,
    p: 0,
    "&:hover": {
        backgroundColor: 'common.white',
        color: 'primary.main',
    }

}

const iconButtonStyle = {
    backgroundColor: 'primary.main',
    color: 'common.white',
    "&:hover": {
        backgroundColor: 'primary.main',
        color: 'secondary.main'
    }
}

const licenseStyle = {
    color: 'text.disabled',
    fontFamily: "'Lora', 'serif'",
    fontWeight: 500,
    mt: 2
}

const modalStyle = {
    outline: 0,
    backgroundColor: 'common.white',
    m: { xs: 2, md: 20 },
    p: { xs: 1, md: 3 },
    borderRadius: 2
};

function Assignment() {

    let { id } = useParams();
    let linkUrl = window.location.href;

    const [assignment, setAssignment] = useState('');
    const [error, setError] = useState('Fetching data');

    const getAssignmentById = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8080/assignments/' + id);
            setAssignment(response.data);
            setError('');
        } catch (error) {
            setAssignment('');
            setError('Fetch failed');
        }
    }, [id])

    useEffect(() => {
        getAssignmentById();
    }, [getAssignmentById]);

    // Modal sähköpostin lähettämiseen
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box sx={ hero }>
            <Container sx={{ maxWidth: 'lg', padding: 3 }}>
                {
                    error.length > 0 ?
                        <Typography>{ Error }</Typography>
                    :
                    assignment ?
                    <Container>
                    <Typography variant="h1" sx={{ my: 3, textAlign: 'center' }}>{ assignment.name }</Typography>
                    <Typography variant= "body2" sx={ heroSubHeader }>{ assignment.description }</Typography>
                    <Typography variant= "body2" sx={ heroUser }>{ "Tämän ohjeen teki: " + assignment.user.first_name + " " + assignment.user.last_name }</Typography>
                    <Box sx={ assignmentBox }>
                        <Grid container spacing={{ xs: 1, md: 2 }}>
                            <Grid item xs={12} sm={6}>
                                {
                                    assignment.images[0] ?
                                    <Box component="img" sx={{ objectFit: 'cover', maxWidth: '100%' }} src={ 'http://localhost:8080/images/' + assignment.images[0].url } alt={ assignment.name } />
                                    :
                                    <Box sx={{ backgroundColor:'white', height: 300, width: 250 }}>
                                        <Typography sx={{ padding:2 }}>No Image</Typography>
                                    </Box>
                                }
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ width: '100%', display: 'flex' }}>
                                    <Typography variant="h2" sx={ subHeader }>{ assignment.classLevel.level }</Typography>
                                    <Box sx={{ ml: 'auto', mt: 0, display: 'flex' }}>
                                        <PrintButton />
                                        <Button onClick={ handleOpen } sx={ shareButton } variant="text" endIcon={<IconButton size="small" sx={ iconButtonStyle } component="span"><SendIcon fontSize="small"/></IconButton>}>Jaa</Button>
                                    </Box>
                                </Box>
                                <Divider variant="middle" sx={{ my: 2, mx: 0, px: 0 }} />
                                <Box sx={{ width: '100%' }}>
                                    <Typography variant="h2" sx={ materialHeader }>Materiaalit ja tarvikkeet</Typography>
                                    { assignment.materials.map( material => {
                                        return (
                                            <Box key={ material.material_id }>
                                                <Typography sx={{ color: 'common.black' }}>{ material.description }</Typography>
                                            </Box>
                                        )}
                                    )}
                                </Box>
                                <Box sx={{ width: '100%', mt: 2 }}>
                                    <Typography variant="h2" sx={ materialHeader }>Ohjeet</Typography>
                                    <Typography sx={{ color: 'common.black' }}>{ assignment.instructions }</Typography>
                                </Box>
                                <Divider variant="middle" sx={{ my: 2, mx: 0, px: 0 }} />
                                <Box sx={{ width: '100%', mt: 2 }}>
                                    <Typography sx={ licenseStyle }>{ "Lisenssi: " + assignment.license.type }</Typography>
                                </Box>
                                
                            </Grid>
                        </Grid>
                    </Box>
                    </Container>

                :
                    <Typography>Oops! Something went Wrong we coundn't find any assignment!</Typography>
                }
            </Container>
            <Modal open={ open } onClose={ handleClose } BackdropProps={{style:{backgroundColor: '#37A040', opacity:'0.2'}}}>
                <Box sx={ modalStyle }>
                    <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                        <IconButton sx={{ ml: 'auto' }} onClick={ handleClose } aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <SendAssignment link={ linkUrl }/>
                </Box>
            </Modal>
        </Box>
    )
}

export default Assignment;