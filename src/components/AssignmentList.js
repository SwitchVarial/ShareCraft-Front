import { Card, CardContent, CardHeader, CardMedia, Container, Grid, Typography, CardActions, Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from 'react-router-dom';

const cardClassLevel = {
    backgroundColor: 'primary.main',
    py: 1,
}

const cardClassLevelHeader = {
    color: 'common.white',
    fontFamily: "'Lato', 'sans-serif'",
    fontWeight: 900,
    fontSize: '1rem',
}

const cardStyle = {
    borderRadius: '7px',
    height: '100%',
}

const cardHeaderStyle = {
    "& .MuiCardHeader-title": {
        fontWeight: 900,
        textAlign: 'left',
        color: 'primary.main',
        fontSize: '1.2rem'
    },
    "& .MuiCardHeader-subheader": {
        color: 'text.disabled',
        fontFamily: "'Lora', 'serif'",
        fontWeight: 500,
        m: 0,
    }
}

const cardLicense = {
    color: 'text.disabled',
    fontFamily: "'Lora', 'serif'",
    fontWeight: 500,
    mt: 2
}

const cardActionsStyle = {
    display: 'flex',
    alignItems: 'flex-end',
    pb: 0
}

function AssignmentList(props) {
    return (
        <Box sx={{ mb: 7 }}>
            <Container sx={{ maxWidth: 'lg', padding: 3 }}>
                <Typography variant='h2' sx={{ my: 3, textAlign: 'center' }}>Nämä ohjeet on jaettu iloksesi ja hyödyksesi</Typography>
                <Typography variant= "body2" sx={{ mb: 5, mt: 3, fontSize: '1.2rem' }}>Jaa opettamisen ilo ja rohkaise oppilaita tekemään itse. Tutustu ohjeiden lisensseihin ja käytä ehtojen mukaisesti.</Typography>

                <Grid container spacing={{ xs: 1, md: 2 }}>
                    { props.assignments.map( assignments => {
                        return (
                            <Grid item xs={12} sm={6} md={3} key={ assignments.assignment_id }>
                                <Card sx={ cardStyle }>
                                    <Box>
                                        <CardContent sx={ cardClassLevel }>
                                            <Typography sx={ cardClassLevelHeader }>{ assignments.classLevel.level }</Typography>
                                        </CardContent>
                                        {
                                            assignments.images[0] ?
                                            <Box component={ Link } to={'/tehtava/' + assignments.assignment_id}>
                                            <CardMedia component="img" sx={{ objectFit: 'cover', height: 300 }} image={ 'http://localhost:8080/images/' + assignments.images[0].url } alt={ assignments.name }/>
                                            </Box>
                                            :
                                            <Box sx={{ backgroundColor:'white', height: 300, width: 250 }}>
                                                    <Typography sx={{ padding:2 }}>No Image</Typography>
                                            </Box>
                                        }
                                        <CardHeader sx={ cardHeaderStyle } title={ assignments.name } subheader={ "Tekijä: " + assignments.user.first_name + " " + assignments.user.last_name } />
                                        <CardContent sx={{ py: 0 }}>
                                            <Typography>{ assignments.description }</Typography>
                                        </CardContent>
                                        <CardActions sx={ cardActionsStyle }>
                                            <Button size="small" component={ Link } to={'/tehtava/' + assignments.assignment_id}>Katso ohje</Button>
                                        </CardActions>
                                        <CardContent sx={{ pt: 0 }}>
                                            <Box>
                                                <Typography sx={ cardLicense }>{ "Lisenssi: " + assignments.license.type }</Typography>
                                            </Box>
                                        </CardContent>

                                    </Box>
                                </Card>
                            </Grid>
                            )     
                        })
                    }
                </Grid>
            </Container>
        </Box>
    )
}

export default AssignmentList;