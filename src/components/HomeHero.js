import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import HeroCard from "./HeroCard";
import axios from 'axios';

const heroBackground = {
    background: "linear-gradient(180deg, rgba(55,160,64,1) 70%, rgba(245,245,245,1) 30%)",
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

function HomeHero() {

    const [assignment, setAssignment] = useState('');
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
    }, []);


    return (
        <Box sx={ heroBackground }>
            <Container sx={{ maxWidth: 'lg', padding: 3 }}>
                <Box>
                    <Typography variant='h1' sx={{ my: 3, textAlign: 'center' }}>Jaa omat tehtäväsi ja hyödynnä muiden suunnittelemia tehtäviä opetuksessasi</Typography>
                    <Typography variant= "body2" sx={ heroSub }>ShareCraft on käsityön koulutehtävien jakamiseen tarkoitettu palvelu. Täällä opettajat voivat jakaa omia ohjeitaan ja hyödyntää muiden suunnittelemia ohjeita vaikkapa sijaisohjeiksi. Ohjeet on jaoteltu luokkatason mukaan ja ne jaetaan valitsemallasi Creative Commons -lisenssillä.</Typography>
                </Box>
                
                {
                error.length > 0 ?
                    <Typography>{ Error }</Typography>
                :
                assignment.name ?
                    <HeroCard card={ assignment } />
                :
                <Typography>Oops! Something went Wrong we coundn't find any assignments!</Typography>
            }
            </Container>
        </Box>
    )
}

export default HomeHero;