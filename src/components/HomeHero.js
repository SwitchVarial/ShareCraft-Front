import { Box, Container, Typography, Button, Modal, Paper, IconButton } from "@mui/material";
import React, { useState } from "react";
// import HeroCard from "./HeroCard";
import SignUp from "./SignUp";
import CloseIcon from '@mui/icons-material/Close';
//import axios from 'axios';

const heroBackground = {
    //background: "linear-gradient(180deg, rgba(55,160,64,1) 70%, rgba(245,245,245,1) 30%)",
    backgroundColor: '#37A040',
    color: 'common.white',
}

const heroSub = {
    color: 'secondary.main',
    fontFamily: "'Lora', 'serif'",
    fontWeight: 700,
    fontSize: '1.2rem',
    mb: 5,
    mt: 3,
}

const menuPrimaryButton = {
    color: 'primary.main',
    backgroundColor: 'common.white',
    borderRadius: '30px',
    mr: 2,
    mb: 5,
    px: 3, 
}

const modalStyle = {
    outline: 0,
    backgroundColor: 'common.white',
    m: { xs: 2, md: 20 },
    p: { xs: 1, md: 3 },
    borderRadius: 2
};

function HomeHero() {

/*     const [assignment, setAssignment] = useState('');
    const [error, setError] = useState('Fetching data');

    const getAssignmentById = async () => {
        try {
            const response = await axios.get('http://localhost:8080/assignments/2');
            setAssignment(response.data);
            setError('');
        } catch (error) {
            setAssignment('');
            setError('Fetch failed');
        }
    }

    useEffect(() => {
        getAssignmentById();
    }, []); */

    // Modal rekisteröitymiseen
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    return (
        <Box sx={ heroBackground }>
            <Container sx={{ maxWidth: 'lg', padding: 3 }}>
                <Box>
                    <Typography variant='h1' sx={{ my: 3, textAlign: 'center' }}>Jaa omat tehtäväsi ja hyödynnä muiden suunnittelemia tehtäviä opetuksessasi</Typography>
                    <Typography variant= "body2" sx={ heroSub }>ShareCraft on käsityön koulutehtävien jakamiseen tarkoitettu palvelu. Täällä opettajat voivat jakaa omia ohjeitaan ja hyödyntää muiden suunnittelemia ohjeita vaikkapa sijaisohjeiksi. Ohjeet on jaoteltu luokkatason mukaan ja ne jaetaan valitsemallasi Creative Commons -lisenssillä.</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                        <Button size="large" variant="contained" onClick={ handleOpen } color="secondary" sx={ menuPrimaryButton }>Liity mukaan</Button>
                    </Box>
                </Box>
                
{/*                 {
                error.length > 0 ?
                    <Typography>{ Error }</Typography>
                :
                assignment.name ?
                    <HeroCard card={ assignment } />
                :
                <Typography>Oops! Something went Wrong we coundn't find any assignments!</Typography>
                } */}
            </Container>
            <Modal open={ openModal } onClose={ handleClose } BackdropProps={{style:{backgroundColor: '#37A040', opacity:'0.2'}}}>
                <Paper sx={ modalStyle }>
                    <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                        <IconButton sx={{ ml: 'auto' }} onClick={ handleClose } aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <SignUp />
                </Paper>
            </Modal>
        </Box>
    )
}

export default HomeHero;