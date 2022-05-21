import React, { useState } from "react";
import { AppBar, Button, Divider, Drawer, IconButton, List, ListItem, ListItemText, MenuItem, MenuList, Toolbar, Modal, Paper } from "@mui/material";
import { Box } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from '@mui/icons-material/Close';
import Logo from "../../src/sharecraft-logo.svg";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import UserMenu from "./UserMenu";
import { Link } from "react-router-dom";

const centeredLogo = {
    position: 'absolute', 
    left: '50%', 
    top: '50%',
    transform: 'translate(-50%, -50%)',
    marginTop: '4px'
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

const menuPrimaryButton = {
    color: 'primary.main',
    backgroundColor: 'common.white',
    borderRadius: '20px',
    mr: 2,
    px: 3, 
}

const menuSecondaryButton = {
    color: 'common.white',
    backgroundColor: 'primary.main',
    mr: 2,
    px: 3,
    border: 2,
    borderRadius: '20px',
    "&:hover": {
        backgroundColor: 'common.white',
        color: 'primary.main',
        border: 2,
        borderColor: 'common.white'
    }
}

const modalStyle = {
    outline: 0,
    backgroundColor: 'common.white',
    m: { xs: 2, md: 20 },
    p: { xs: 1, md: 3 },
    borderRadius: 2
};

function MainMenu() {

    // Drawerin tilamuuttuja ja funktiot sulkemisella ja avaamiselle
    const [open, setOpen ] = useState(false);
    const openDrawer = () => { setOpen(true); }
    const closeDrawer = () => { setOpen(false); }

    // Modal rekisteröitymiseen
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    // Modal kirjautumiseen
    const [openSignModal, setOpenSignModal] = useState(false);
    const handleSignOpen = () => setOpenSignModal(true);
    const handleSignClose = () => setOpenSignModal(false);  

    const [token, setToken] = useState();
    const signOut = () => setToken();
    console.log(token);

    // Drawerin sisältö
    const drawer = 
    <Drawer anchor="left" open={ open } onClick={ closeDrawer } BackdropProps={{ style:{backgroundColor: '#37A040', opacity:'0.2' }}}>
        <Box>
            <IconButton onClick={ closeDrawer }>
                <CloseIcon />
            </IconButton>
        </Box>
        <List>
            <ListItem button component={Link} to="/" sx={{ pl: 6, pr: 10, py: 0 }}>
                <ListItemText primary="Etusivu" />
            </ListItem>
            <ListItem button component={Link} to="tehtavat" sx={{ pl: 6, pr: 10, py: 0 }}>
                <ListItemText primary="Tehtävät" />
            </ListItem>
            <ListItem button component={Link} to="lisenssit" sx={{ pl: 6, pr: 10, py: 0 }}>
                <ListItemText primary="Lisenssit" />
            </ListItem>
            <ListItem button component={Link} to="info" sx={{ pl: 6, pr: 10, pt: 0, mb: 3 }}>
                <ListItemText primary="Info" />
            </ListItem>
            <Divider />
            { !token ?
                <>
                <ListItem>
                    <Button size="small" variant="contained" onClick={ handleOpen } color="secondary" sx={{ mt: 2, width: '100%', borderRadius: '20px' }}>Rekisteröidy</Button>
                </ListItem>
                <ListItem>
                    <Button size="small" variant="contained" onClick={ handleSignOpen } color="primary"  sx={{ width: '100%', borderRadius: '20px' }}>Kirjaudu</Button>
                </ListItem>
                </>
            :
                <Box sx={{ mt: 4 }}>
                <ListItem button component={Link} to="lisaa-tehtava" sx={{ pl: 6, pr: 10, py: 0, mb: 3}}>
                    <ListItemText sx={{ color: 'primary.main' }} primary="Lisää tehtävä" />
                </ListItem>
                <ListItem>
                    <Button size="small" variant="contained" onClick={ signOut } color="primary"  sx={{ width: '100%', borderRadius: '20px' }}>Kirjaudu ulos</Button>
                </ListItem>
                </Box>
            }
        </List>
    </Drawer>;

    return (
        <Box>
            <Box component="header">
                <AppBar position="static" sx={{ p: 1 }}>
                    <Toolbar>

                        <IconButton onClick={ openDrawer } color="inherit" sx={{ color: 'common.white', display: { xs: "block", md: "none" } }}>
                            <MenuIcon />
                        </IconButton>

                        <MenuList sx={{ display: { xs: "none", md: "flex" } }}>
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

                        <Box sx={ centeredLogo }>
                            <Box component="img" src={ Logo } sx={{ height: 37, width: 161 }}alt="ShareCraft-logo" />
                        </Box>
                        <Box sx={{ marginLeft: "auto", display: { xs: "none", md: "flex" } }}>
                        { !token ?
                            <>
                            <Button size="small" onClick={ handleOpen } variant="outlined" color="inherit" sx={ menuSecondaryButton }>Rekisteröidy</Button>
                            <Button size="small" onClick={ handleSignOpen } variant="contained" color="secondary" sx={ menuPrimaryButton }>Kirjaudu</Button>
                            </>
                        :
                        <UserMenu />
                        }
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            { drawer }
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
            { !token ?
            <Modal open={ openSignModal } onClose={ handleSignClose } BackdropProps={{style:{backgroundColor: '#37A040', opacity:'0.2'}}}>
                <Paper sx={ modalStyle }>
                    <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                        <IconButton sx={{ ml: 'auto' }} onClick={ handleSignClose } aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    
                    <SignIn setToken={ setToken }/>
                    
                </Paper>
            </Modal>
            : <Box/>
            }
        </Box>
    )
}

export default MainMenu;