import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DialogContentText from '@mui/material/DialogContentText';
import { InputLabel } from '@mui/material';
import Home from './system/home-system';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

import { observer } from "mobx-react";
import systemStore from "../data/system";
import UserStore from '../data/user';


function MenuAppBar() {
    const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [auth, setAuth] = React.useState(true);
  const _auth= getAuth();
  const [user,loading,error]=useAuthState(_auth);
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };  
    const handleClickOpen = () => {
        setOpen(true);
        onLoad();
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setAuth(event.target.checked);
    };

    const onLoad= async () => {
      if(user?.uid){
        const usered=await UserStore.getById(user?.uid);    
        swal(`Hello to ${usered?.firstName} ${usered?.lastName}
        \n We Happy to see you! 😍`);
      }
       
    }

   const handleProfile=()=>{
    handleClickOpen();
    handleClose();
    }
    
    const showAll=()=>{
        navigate(`/home`);
    }

    const showSystemFromUser=()=> {
      if(user?.uid)
       systemStore.getSystems(user?.uid);
      navigate('/myHome');
    } 
 

  return(<div>

  <Box sx={{ flexGrow: 1 }}>
  <AppBar position="static" >
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
       Welcome To The App
      </Typography>
      <Button color="inherit" onClick={showAll}>Show all systems</Button>
      <Button color="inherit" onClick={showSystemFromUser}>show System From Me</Button>
      {auth && (
        <div>
          <IconButton size="large" aria-label="account of current user"
            aria-controls="menu-appbar" aria-haspopup="true" onClick={handleProfile} color="inherit" >
            <AccountCircle />
          </IconButton>
        </div>
      )}
    </Toolbar>
  </AppBar>
  <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add new system</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Your details here: 😊
                </DialogContentText>
                <Box component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' },}}
                    noValidate autoComplete="off">
                    <div>
                        <InputLabel>yourName: {}</InputLabel>
                    </div>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>OK</Button>
            </DialogActions>
    </Dialog>
</Box>
</div>)
}

export default  observer(MenuAppBar);