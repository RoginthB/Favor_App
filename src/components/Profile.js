import {
  Avatar,
  Box,
  Container,
  IconButton,
  Typography,
  Stack,
  ImageList,
  ImageListItem,
  
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
//import axios from "axios";
import store from "../store";
//import { useDispatch } from "react-redux";
import { deleteData } from "../reducers/appReducers";
import LoginPage from "./LoginPage";

function Profile() {
  const [userLogedIn, setUserLogedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();
  //const dispatch = useDispatch();
  useEffect(() => {
    setUserDetails(store.getState().loginUserDetails.user);
    if (Object.keys(userDetails).length !== 0) {
      setUserLogedIn(true);
    }
  }, [userDetails]);

  // const handleGetUserData = (email) => {
  //   axios
  //     .get(process.env.REACT_APP_API_URL + "/user/login/" + email)
  //     .then((response) => {
  //       setUserDetails(response.data);
  //       store.dispatch(getNewData(response.data));
  //     });
  //   console.log(userDetails);
  // };
  const handelLogOut = () => {
    setUserLogedIn(false);
    store.dispatch(deleteData());
  };
  return (
    <>
      {
        !userLogedIn && <LoginPage />
      }
      {userLogedIn && (
        <Container
          maxWidth="sm"
          sx={{ marginTop: "80px", marginBottom: "80px" }}
        >
          <Typography
            component="p"
            variant="h4"
            textAlign="center"
            color="primary"
          >
            Profile
          </Typography>
          <Box>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ width: "100%", margin: "auto" }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="start"
                sx={{ width: "80%" }}
              >
                <Avatar
                  sx={{
                    backgroundColor: "#497174",
                    width: "80px",
                    height: "80px",
                    margin: "10px",
                    fontSize:'40px'
                  }}
                >
                  {userDetails.name[0]}
                </Avatar>
                <Box sx={{ padding: "20px" }}>
                  <Typography component="p" variant="h5" noWrap={true}>
                    {userDetails.name}
                  </Typography>
                  <Typography component="p" variant="p">
                    {userDetails.userId}
                  </Typography>
                </Box>
              </Stack>
              <IconButton
                edge="center"
                aria-label="LogoutRoundedIcon"
                onClick={() => {
                  navigate("/login");
                  handelLogOut();
                }}
              >
                <LogoutRoundedIcon
                  fontSize="large"
                  sx={{
                    width: "24px",
                    color: "secondary",
                    "& :hover": { color: "primary" },
                  }}
                />
              </IconButton>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-around"
              spacing={2}
              sx={{
                backgroundColor: "#eff5f5",
                paddingBottom: "20px",
                borderRadius: "20px",
                margin: "auto",
              }}
            >
              {[
                { no: userDetails.post.length, name: "Post" },
                { no: userDetails.followers.length, name: "Followers" },
                { no: userDetails.following.length, name: "Following" },
              ].map((data,index) => {
                return (
                  <Stack direction="column" alignItems="center" key={index}>
                    <IconButton color="primary">
                      <Typography
                        sx={{ padding: "20px", fontWeight: 600 }}
                        color="primary"
                      >
                        {data.no}
                      </Typography>
                    </IconButton>
                    <Typography color="primary" sx={{ fontWeight: 300 }}>
                      {data.name}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>
            <Box sx={{ marginTop: "24px", marginBottom: "84px" }}>
              <ImageList sx={{ width: "100%", height: "auto" }} cols={3}>
                {userDetails.post.map((item) => (
                  <ImageListItem key={item._id}>
                    <img
                    className={item.userUniqId}
                      id={item._id}
                      style={{width:"164px", height:"164px", objectFit:"cover"}}
                      src={item.imagePath}
                      srcSet={item.imagePath}
                      alt={item.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
}

export default Profile;
