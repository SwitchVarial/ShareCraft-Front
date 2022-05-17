import React, { Component } from "react";
import PrintIcon from '@mui/icons-material/Print';
import { Button, IconButton, Box } from "@mui/material";

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

export default class PrintButton extends Component {
    print(){
        window.print();
    }

    render() {
        return (
        <Box>
        <Button sx={ shareButton } onClick={this.print} variant="text" endIcon={<IconButton size="small" sx={ iconButtonStyle } component="span"><PrintIcon fontSize="small"/></IconButton>}>Tulosta</Button>
        </Box>
        )
    } 
}