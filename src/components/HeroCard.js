import { Box, Button, Card, CardContent, CardHeader, CardMedia, Divider, IconButton, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import PrintIcon from '@mui/icons-material/Print';
import React from "react";

const cardStyle = {
    display: 'flex',
    borderRadius: '7px',
    height: '100%'
}

const cardHeaderStyle = {
    "& .MuiCardHeader-title": {
        fontWeight: 900,
        textAlign: 'left',
        color: 'common.black',
        fontSize: '1.4rem'
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

const cardSubHeader = {
    fontWeight: 900,
    textAlign: 'left',
    color: 'primary.main',
    fontSize: '1.2rem',
    display: 'inline',
    mt: 1
}

const cardButton = {
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



function HeroCard(props) {
    return (
        <Box>
            <Card sx={ cardStyle }>
                <CardMedia component="img" sx={{ width: '50%'}} image={ props.card.images[0].url } alt={ props.card.name } />
                <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: '50%' }}>
                <CardContent>
                    <Box sx={{width: '100%', display: 'flex'}}>
                        <Typography variant="h2" sx={ cardSubHeader }>{ props.card.classLevel.level }</Typography>
                        <Box sx={{ ml: 'auto', mt: 0, display: { xs: "none", md: "flex" } }}>
                            <Button sx={ cardButton } variant="text" endIcon={<IconButton size="small" sx={ iconButtonStyle } component="span"><PrintIcon fontSize="small"/></IconButton>}>Tulosta</Button>
                            <Button sx={ cardButton } variant="text" endIcon={<IconButton size="small" sx={ iconButtonStyle } component="span"><SendIcon fontSize="small"/></IconButton>}>Jaa</Button>
                        </Box>
                    </Box>
                </CardContent>
                <Divider variant="middle" />
                <CardHeader sx={ cardHeaderStyle } title={ props.card.name } subheader={ "Tekijä: " + props.card.user.first_name + " " + props.card.user.last_name } />
                <CardContent sx={{ pt: 0 }}>
                    <Typography>{ props.card.description }</Typography>
                    <Typography sx={{ color: 'primary.main' }}>Lue koko ohje</Typography>
                    <Typography sx={ cardLicense }>{ "Lisenssi: " + props.card.license.type }</Typography>
                </CardContent>
                <Divider variant="middle" />
                <CardContent>
                    <Typography variant="h2" sx={ cardSubHeader }>Materiaalit ja tarvikkeet</Typography>
                    { props.card.materials.map( material => {
                        return (
                            <Box key={ material.material_id }>
                                <Box>
                                    <Typography>{ material.description }</Typography>
                                </Box>
                            </Box>
                        )}
                    )}
                </CardContent>
                </Box>  
            </Card>
        </Box>
    )
}

export default HeroCard;