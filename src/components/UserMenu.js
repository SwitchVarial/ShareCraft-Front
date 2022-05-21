import { Box, IconButton, MenuList, MenuItem, ListItemText } from "@mui/material";
import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";

const iconButtonStyle = {
    color: 'common.white',
    "&:hover": {
        color: 'secondary.main'
    }
}

const menuItemStyle = {
    color: 'common.white',
    borderBottom: 2,
    borderColor: 'primary.main',
    "&:hover": {
        color: 'secondary.main',
        borderBottom: 2,
        borderColor: 'secondary.main',
    }
}

function UserMenu () {
    return (
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <MenuList sx={{ display: { xs: "none", md: "flex" } }}>
                <MenuItem component={Link} to="lisaa-tehtava" sx={ menuItemStyle }>
                    <ListItemText primaryTypographyProps={{fontSize: '1rem'}} primary="Lisää tehtävä" />
                </MenuItem>
            </MenuList>
            <Box sx={{ marginRight: "auto", display: { xs: "none", md: "flex" } }}>
                <IconButton color="secondary" aria-label="Käyttäjän menu" size="large">
                    <AccountCircleIcon sx={ iconButtonStyle } />
                </IconButton>
            </Box>
        </Box>
    )
}

export default UserMenu;