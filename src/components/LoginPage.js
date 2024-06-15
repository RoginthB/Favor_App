// src/components/LoginPage.js
import React, { useState  } from 'react';
import {useNavigate , Link} from 'react-router-dom';

import axios from 'axios';
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Grid,
  Backdrop,
  CircularProgress
} from '@mui/material';
import { useDispatch} from 'react-redux';
import {getNewData} from '../reducers/appReducers'
//import store from '../store';


const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const[open, setOpen]=useState(false);
  // const [loginDataFromDB, setLoginDataFromDB]=useState(null);
  const [wrongPass , setWrongPass] = useState(false);
  const [wrongEmail, setWrongEmail]=useState(false);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
    try {
      axios.post(process.env.REACT_APP_API_URL +'/user/login', loginData).then( res =>{
        // axios.post('http://localhost:5000/user/login', loginData).then( res =>{
        setOpen(false);
        if(res.status === 205){
          setWrongEmail(true);
          setWrongPass(false);
        }
        else if(res.status ===200){
          dispatch(getNewData(res.data));
          setWrongPass(false);
          setWrongEmail(false)
          navigate("/");
        }else if(res.status === 203){
          setWrongEmail(false)
          setWrongPass(true);
        }else{
          alert(res.data.message);
        }
      })
    } catch (error) {
      setOpen(false);
    }
    
      
  };

  return (
    <>
    <Grid
    container
    alignItems='center'
    justifyContent='center'
    style={{minHeight:'100vh'}}
    >
    <Container component="main" maxWidth="xs" >
      <Paper elevation={3} style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 20 }}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            margin="normal"
            required
            error={wrongEmail}
            helperText={ wrongEmail?"Please enter the correct Email Id":""}
            value={loginData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            required
            error={wrongPass}
            helperText={wrongPass? "Please enter the correct password" : ''}
            value={loginData.password}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: 20 }}>
            Login
          </Button>
          <Typography variant="body2" style={{ marginTop: 10 }}>
            Don't have an account? <Link to="/CreateUser">Register</Link>
          </Typography>
        </form>
      </Paper>
    </Container>
    </Grid>
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        //onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default LoginPage;
