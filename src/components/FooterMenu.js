import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Logo from "../../src/sharecraft-logo.svg";
import { ListItemText, MenuItem, MenuList } from "@mui/material";

import { Link } from "react-router-dom";

const footerStyle = {
    backgroundColor: '#37A040',
    p: 4,
    mt: "auto"
}

const menuItemStyle = {
    color: 'common.white',
    fontSize: '1rem',
    textDecoration: 'none',
    borderBottom: 2,
    borderColor: 'primary.main',
    "&:hover": {
        color: 'secondary.main',
        borderBottom: 2,
        borderColor: 'secondary.main',
    }
}

const copyrightStyle = {
    mt: 3,
    textAlign: 'center',
    fontSize: '0.8rem',
}

const logoStyle = {
    height: 37,
    width: 161,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
}


function Copyright() {
    return (
        <Typography color="common.white" sx={ copyrightStyle }>
            {"Copyright © "}{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

export default function StickyFooter() {
    return (
        <Box component="footer" sx={ footerStyle }>
            <Container>
                <Box>
                    <MenuList sx={{ display: 'flex', justifyContent: 'center' }}>
                        <MenuItem component={Link} to="/" sx={ menuItemStyle }>
                            <ListItemText primaryTypographyProps={{fontSize: '1rem'}} primary="Etusivu" />
                        </MenuItem>
                        <MenuItem component={Link} to="tehtavat" sx={ menuItemStyle }>
                            <ListItemText primaryTypographyProps={{fontSize: '1rem'}} primary="Tehtävät" />
                        </MenuItem>
                        <MenuItem component={Link} to="lisenssit" sx={ menuItemStyle }>
                            <ListItemText primaryTypographyProps={{fontSize: '1rem'}} primary="Lisenssit" />
                        </MenuItem>
                        <MenuItem component={Link} to="info" sx={ menuItemStyle }>
                            <ListItemText primaryTypographyProps={{fontSize: '1rem'}} primary="Info" />
                        </MenuItem>
                    </MenuList>
                </Box>
                <Box sx={{ my:3, textAlign: 'center'}}>
                    <Box component="img" src={ Logo } sx={ logoStyle } alt="ShareCraft-logo" />
                    <Typography color="common.white" variant="body2">Jaa käsitöiden opettamisen ilo</Typography>
                    <Copyright />
                </Box>
            </Container>
        </Box>
    );
}
