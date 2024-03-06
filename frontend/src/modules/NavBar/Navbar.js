import React from 'react';
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';





const Navbar = () => {

  const theme = useTheme();

  return (
    
    <nav className="navbar">
      
        <Box sx={{ flexGrow: 1  }}>
          <AppBar position="static">
            <Toolbar>

              <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                EVENTCRAFT
              </Typography>
                
              

              <Typography variant="h6" component="div" sx={{ flexGrow: 40 }}>
              <Link  to="/" style={{color: theme.palette.secondary.main , textDecoration: 'none' }}>Home</Link>
              </Typography>

              <Button color="inherit"><Link to="/log" style={{color: theme.palette.secondary.main  , textDecoration: 'none' }}>Login</Link></Button>

            </Toolbar>
          </AppBar>
        </Box>
      
           
    </nav>
  );
}


export default Navbar;
