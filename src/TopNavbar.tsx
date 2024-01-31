import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // If using React Router
import { useAuth } from './context/AuthContext';


const TopNavbar: React.FC = () => {
  const {token,setToken} = useAuth()
  const handleButtonClick = () => {
    localStorage.removeItem('token');
    setToken(null);
  };
  
  return (  
    <AppBar position="fixed" sx={{ backgroundColor: 'black' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Automation Report 
        </Typography>
        {token ? (
          <>
            <Button color="warning">
              <Link to="/createReport">Create Report</Link>
            </Button>
            <Button color="warning">
              <Link to="/createJob">Create Job</Link>
            </Button>
            <Button color="warning" onClick={handleButtonClick}>
              <Link to="/">Logout</Link>
            </Button>
          </>
      ) : (
        <Link to="/">Login</Link>
      )}

      </Toolbar>
    </AppBar>
  );
};

export default TopNavbar;