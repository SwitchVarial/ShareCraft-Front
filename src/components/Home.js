import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import AssignmentList from "./AssignmentList";
import axios from 'axios';
import HomeHero from "./HomeHero";

function Home() {

    const [assignments, setAssignments] = useState([]);
    const [error, setError] = useState('Fetching data');

    const getAllAssignments = async () => {
        try {
            const response = await axios.get('http://localhost:8080/assignments');
            setAssignments(response.data);
            setError('');
        } catch (error) {
            setAssignments([]);
            setError('Fetch failed');
        }
    }

    useEffect(() => {
        getAllAssignments();
    }, []);

    return (
        <Box sx={{minHeight: '100vh'}}>
            <HomeHero />
            {
                error.length > 0 ?
                    <Typography>{ Error }</Typography>
                :
                assignments.length > 0 ?
                    <AssignmentList assignments={ assignments } />
                :
                <Typography>Oops! Something went Wrong we coundn't find any assignments!</Typography>
            }
        </Box>
    )
}

export default Home;