import React from 'react'
import './Header.css'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const Header = (props) => {
    return (
        <AppBar position='static' color='primary'>
            <Toolbar>
                <Typography variant='h6' color='inherit'>
                    {props.children}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header