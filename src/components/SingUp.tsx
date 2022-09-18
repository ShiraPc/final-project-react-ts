import React, { useState,useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';
import { auth, registerWithEmailAndPassword,signInWithGoogle } from "../firebase";

// import { createUser} from '../api/user';
// import "../css/Register.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import User, { Role } from '../interfaces/User';
import UserStore from '../data/user';
import { observer } from 'mobx-react';
import swal from 'sweetalert';

 function SignUpPage() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole]= useState('');
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
    if (loading) {
      swal(`Welcome to ${user?.email} `)
      return;
    }
      if (user) {
          createInMongo();
          
         navigate(`/map`);   
      };
    }, [user, loading]);
  
  
   const createUser= async (newUser:User) => {
      await UserStore.add(newUser);
      console.log(error);
    
}

  const createInMongo=async()=>{
      const newUser = {
        uid: String(user?.uid),
        role: Role.customer,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
            }
            try{
            await createUser(newUser);
            }catch{
console.log("create failed");
            }
  }
      const signInGoogle = () => {
        signInWithGoogle();
  };
  
    return (
       <form  className='auth-inner' >
        {/* onSubmit={()=>registerWithEmailAndPassword(firstName+' '+lastName,email, password)} */}
      <Box sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
     
        <Typography component="h1" variant="h5">
              Sign Up
        </Typography>
        <div className="mb-3">
        <TextField
                margin="normal"
                required
                id="First name"
                label="First name"
                name="First name"
                autoComplete="Last name"
                autoFocus
                className="form-control"
                onChange={(e) => setFirstName(e.target.value)}
              />
        </div>
        <div className="mb-3">
        <TextField
                margin="normal"
                required
                id="Last name"
                label="Last name"
                name="Last name"
                autoComplete="Last name"
                autoFocus
                className="form-control"
                onChange={(e) => setLastName(e.target.value)}
              />
        </div>
        
          <div className="mb-3">
          <TextField
                margin="normal"
                required
                id="Phone"
                label="Phone"
                name="Phone"
                autoComplete="Phone"
                autoFocus
                className="form-control"
                onChange={(e) => setPhone(e.target.value)}
              />
        </div>
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
            onClick={()=>registerWithEmailAndPassword(firstName+' '+lastName,email, password)}>
            Sign Up
        </Button>
          <div className="mb-3">
                <Button type="button" className="login-with-google-btn" onClick={() => signInGoogle()}>
                 Sign Up with Google
             </Button>
          </div>
        </div>
        <Button type="button" className="forgot-password text-right">
          Already registered <a href="/login">sign in?</a>
        </Button>
        </Box>
      </form>
    )
}

export default observer(SignUpPage)
