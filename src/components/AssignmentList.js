import { Card, CardContent, CardHeader, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function AssignmentList(props) {
    return (
        <Box sx={{ mb: 7 }}>
            <Container sx={{ maxWidth: 'lg', padding: 3 }}>
                <Typography variant='h3' sx={{ my: 3, textAlign: 'center' }}>Nämä ohjeet on jaettu iloksesi ja hyödyksi</Typography>
                <Typography variant= "body2" sx={{ mb: 5, mt: 3, fontSize: '1.2rem' }}>Jaa opettamisen ilo ja rohkaise oppilaita tekemään itse. Tutustu ohjeiden lisensseihin ja käytä ehtojen mukaisesti</Typography>

                <Grid container spacing={{ xs: 1, md: 2 }}>
                    { props.assignments.map( assignments => {
                        return (
                            <Grid item xs={12} sm={6} md={3} key={ assignments.assignment_id }>
                                <Card sx={{ borderRadius: '7px' }}>
                                    <Box>
                                        <CardHeader title={ assignments.name } subheader={ assignments.name } />
                                        <CardContent>
                                            <Typography>{ assignments.description }</Typography>
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