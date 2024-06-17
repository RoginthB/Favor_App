import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import axios from "axios";
import store from "../store";
import { getNewData } from "../reducers/appReducers";
function Post() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const navigate = useNavigate();
  //const [isPosted, setIsPosted] = useState(false);
  const [loginUserDetails, setLoginUserDetails] = useState(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setLoginUserDetails(store.getState().loginUserDetails.user);
    
    if (!image) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload=()=>{
      setPreviewUrl(reader.result);
    }
    //setPreviewUrl(URL.createObjectURL(image));

    // return () => {
    //   URL.revokeObjectURL(previewUrl);
    //   console.log(previewUrl)
    // };
  },[image]);
  const handleRemoveImage = () => {
    setImage(null);
  };
  const handleSumbit = async (e) => {

    if (loginUserDetails == null) {
      navigate('/profile');
    }
    try {
      const formData = {
        image:previewUrl,
        title:title,
        description:description,
        rating:0,
        israted:false,
        userName:loginUserDetails.name,
        userId:loginUserDetails.userId,
        userUniqId:loginUserDetails._id
      }
      
      
      
      // new FormData();
      // formData.append("image", previewUrl);
      // formData.append("title", title);
      // formData.append("description", description);
      // formData.append("rating", 0);
      // formData.append("israted", false);


      // const response =await axios.post("http://localhost:5000/images/upload",{
      //   title,description
      // });israted: false,
      if (title !== "" && description !=="") {
        e.preventDefault();
        setOpen(true);
        
        const response = await axios.post(
          process.env.REACT_APP_API_URL +
            `/user/${store.getState().loginUserDetails.user._id}/upload`,
          formData
        );
        
        //actual server
        // "http://localhost:5000"
        // const response = await axios.post(
        //   process.env.REACT_APP_API_URL +
        //     `/${store.getState().loginUserDetails.user._id}/upload`,
        //   formData
        // );
        if (response.status === 200) {
         store.dispatch(getNewData(response.data));
          setOpen(false);
          navigate("/");
        } else {
          setOpen(false);
          console.log("Image not uploaded");
        }
      }
    } catch (error) {
      setOpen(false);
      console.error("Error uploading image:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "100px" }}>
      {/* {!isPosted && <Message />} */}

      <>
        <Typography
          color="primary"
          component="p"
          variant="h4"
          textAlign="center"
          sx={{ marginBottom: "24px" }}
        >
          Post
        </Typography>
        <form onSubmit={handleSumbit}>
          <Box
            sx={{
              width: "80%",
              margin: "auto",
              marginBottom: "50px",
              backgroundColor: "#eff5f5",
              borderRadius: "20px",
              boxShadow: "inherit",
              padding: "20px",
            }}
          >
            <Stack
              spacing={1}
              justifyContent="center"
              alignItems="center"
              direction="row"
            >
              {!image && (
                <Button
                  fullWidth
                  variant="text"
                  sx={{ height: 100, outline: "2px dashed" }}
                  color="primary"
                  component="label"
                  endIcon={<FolderIcon />}
                >
                  Choose Photo
                  <input
                    hidden
                    accept="image/"
                    multiple
                    type="file"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                  />
                </Button>
              )}
              {image && (
                <div style={{ position: "relative" }}>
                  <img
                    style={{
                      width: "100%",
                      objectFit: "scale-down",
                      borderRadius: "8px",
                    }}
                    src={previewUrl}
                    alt={"preview"}
                  />
                  <span
                    onClick={handleRemoveImage}
                    style={{
                      color: "red",
                      backgroundColor: "white",
                      width: 24,
                      height: 24,
                      position: "absolute",
                      zIndex: "99",
                      right: "3%",
                      top: "3%",
                      borderRadius: "50%",
                    }}
                  >
                    <CancelRoundedIcon
                      sx={{
                        "&:hover": {
                          scale: "1.2",
                          cursor: "pointer",
                        },
                      }}
                    />
                  </span>
                </div>
              )}
            </Stack>

            <Stack direction="column" spacing={1} sx={{ marginTop: "12px" }}>
              <InputLabel shrink htmlFor="bootstrap-input">
                Create a Title.
              </InputLabel>
              <TextField
                required
                id="outlined-required"
                label="Title"
                size="small"
                //error={title ===""}
                value={title}
                onChange={(e) => {
                  settitle(e.target.value);
                }}
                helperText={title === "" ? "please enter the Title." : ""}
              />
              <InputLabel shrink htmlFor="bootstrap-input">
                Create a Description.
              </InputLabel>
              <TextField
                required
                //error={description===""}
                value={description}
                multiline
                maxRows={3}
                id="outlined-required"
                label="Write a description"
                size="small"
                onChange={(e) => {
                  setdescription(e.target.value);
                }}
                helperText={
                  description === "" ? "please enter the description." : ""
                }
              />
            </Stack>
            <Button
              fullWidth
              size="large"
              sx={{ marginTop: "24px" }}
              type="submit"
              onClick={handleSumbit}
              variant="contained"
              color="primary"
              endIcon={<SendIcon />}
              disabled={image === null}
            >
              Post
            </Button>
          </Box>
        </form>
      </>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}

export default Post;
