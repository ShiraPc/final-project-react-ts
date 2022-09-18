import React, { useState,useEffect } from 'react';
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import swal from 'sweetalert';
// import '../css/Login.css'

 export default function LoginPage(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading, error] = useAuthState(auth);
   useEffect(() => {
      console.log('useEffect');
    if (loading) {
      return;
    }
    if (user)  {
      console.log('if user');
      console.log(user);
      
      user.getIdToken().then((value=>{ const token=value;
      console.log(token);
    }));
      // navigate(`/HomePage/${user.uid}`);
      navigate(`/map`);   
    }
   }, [user, loading]);
  
   const EnterWithoutRegistered=()=>{
       navigate(`/map`);
   }


    return (<div className='auth-inner' >
     <Box sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
       <Typography component="h1" variant="h5">
              Sign in
        </Typography>
        <div className="mb-3">
        <TextField
                margin="normal"
                required
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
        </div>
        <div className="mb-3">
        <TextField
        className="form-control"
                margin="normal"
                required
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
        </div>           
        <div className="d-grid">
          <Button type="button" className="btn btn-primary"
            onClick={() => logInWithEmailAndPassword(email, password)}>
            Submit🥰
          </Button>
        </div>
         <div className="mb-3">
              <div className="d-grid">
              <Button type="button" className="login-with-google-btn"
              onClick={signInWithGoogle} >
                Sign in with Google😀
             </Button>
          </div>
          </div>
          <div className="d-grid">
          <Button type="button" className="btn btn-primary"
            onClick={EnterWithoutRegistered}>
            Customers? Enter without registered😉
          </Button>
        </div>
        <Button type="button" className="forgot-password text-right">
          Forgot <a href="#"> your password?🤥</a>
        </Button>
        <Button className="forgot-password text-right">
          Not registered yet?🤔 <a href="/signUp">Sign Up</a>
        </Button>
       
     </Box> 
      </div> )
   
};