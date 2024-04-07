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

  Grid
} from '@mui/material';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [loginDataFromDB, setLoginDataFromDB]=useState(null);
  
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
     axios.get(process.env.REACT_APP_API_URL+'/user/login/'+loginData.email.trim()).then(  res=>{
         setLoginDataFromDB(res.data);
    })

    if(loginDataFromDB==null){
      alert("This Email Id is wrong !");
    }else{
    if(loginData.email.toLocaleLowerCase() === loginDataFromDB.email.toLocaleLowerCase() && loginData.password === loginDataFromDB.password){
      //alert(`${loginDataFromDB.name} your are login Successfuly !!`);
      localStorage.setItem('userLogdIn',JSON.stringify(true));
      localStorage.setItem("userDetails", JSON.stringify(loginData));
      navigate("/");

    }else{
        alert("password is wrong !");
    }
    }
  };

  return (
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
  );
};

export default LoginPage;
