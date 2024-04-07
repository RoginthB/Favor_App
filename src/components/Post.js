import { Box, Button, Container, InputLabel, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import FolderIcon from '@mui/icons-material/Folder';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//import Message from './Message';
function Post() {
  const [image, setimage] = useState(null);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const navigate = useNavigate();
  const [isPosted, setIsPosted] = useState(false);

  const handleSumbit = async () => {
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('title', title);
      formData.append('description', description);
      formData.append("rating", 0);
      formData.append('israted', false);
      formData.append('userName', "User Name");
      formData.append('userId', "user ID");
      console.log(formData)
      // const response =await axios.post("http://localhost:5000/images/upload",{
      //   title,description
      // });israted: false,

      const response = await axios.post(process.env.REACT_APP_API_URL+'/images/upload', formData);
      console.log('Image uploaded:', response.data);
      navigate("/");
      setIsPosted(true);

    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <Container maxWidth='sm' sx={{ marginTop: '100px' }}>

      {/* {!isPosted && <Message />} */}

      {!isPosted &&
        <>
          <Typography color='primary' component='p' variant='h4' textAlign='center' sx={{ marginBottom: '24px' }}>
            Post
          </Typography>
          <Box sx={{ width: '80%', margin: 'auto', backgroundColor: '#eff5f5', borderRadius: '20px', boxShadow: 'inherit', padding: '20px' }} >
            <Stack spacing={2}
              justifyContent="center"
              alignItems="center"
              direction='row' >
              <Button fullWidth variant="contained" color='primary' component="label" endIcon={<FolderIcon />}>
                Choose Photo
                <input hidden accept="image/" multiple type="file" onChange={(e) => {
                  setimage(e.target.files[0]);
                }} />
              </Button>
            </Stack>
            <Stack direction='column' spacing={2} sx={{ marginTop: '24px' }}>
              <InputLabel shrink htmlFor="bootstrap-input">
                Create a Title.
              </InputLabel>
              <TextField
                required
                id="outlined-required"
                label="Title"
                size='small'
                onChange={(e) => { settitle(e.target.value) }}
              />
              <InputLabel shrink htmlFor="bootstrap-input">
                Create a Description.
              </InputLabel>
              <TextField
                required
                id="outlined-required"
                label="Write a description"
                size='small'
                onChange={(e) => { setdescription(e.target.value) }}
              />
            </Stack>
            <Button fullWidth size='large' sx={{ marginTop: '36px' }} onClick={handleSumbit} variant='contained' color='primary' endIcon={<SendIcon />}>Post</Button>
          </Box>
        </>
      }

    </Container>
  )
}

export default Post