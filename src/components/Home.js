import React, { useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import store from "../store";
import { useNavigate } from "react-router-dom";

//import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import axios from "axios";
import { getNewData } from "../reducers/appReducers";

function Home() {
  // const [isFilled, setIsFilled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isFollowed, setFollowed] = useState(false);
  const [dataList, setDataList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setOpen(true)
    axios.get(process.env.REACT_APP_API_URL + "/user/images").then((res) => {
      setDataList(randomSort(res.data));
      //console.log(res.data);
      setOpen(false)
    });
  }, [isFollowed]);
  function randomSort(arr) {
    return arr
      .map((val) => ({ val, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ val }) => val);
  }
  const checkFolloweOrNot = (id) => {
    
    if (Object.keys(store.getState().loginUserDetails.user).length === 0) {
      return false;
    } else {
      const resulte = store
        .getState()
        .loginUserDetails.user.following.some((item) => item.userUniqId === id);
        return resulte;
        
    }
  };

  // const handleRating= (e,id) => {
  //   const updatedDatalist = dataList.map(data => data._id === id ? {...data , rating: e.})

  // };
  const handleFollow = (id) => {
    const loginUser = store.getState().loginUserDetails.user;

    if (Object.keys(loginUser).length !== 0) {
      const followerDetails = {
        userName: loginUser.name,
        userUniqId: loginUser._id,
        email: loginUser.email,
        startDateForFollow: Date.now(),
      };

      axios
        .post(
          process.env.REACT_APP_API_URL + `/user/${id}/follower`,
          followerDetails
        )
        .then((res) => {
          store.dispatch(getNewData(res.data));
          setFollowed(!isFollowed)
          
        });
    } else {
      navigate("/profile");
    }
  };

  return (
    <>
      <Container maxWidth="md" sx={{ marginTop: "80px", marginBottom: "80px" }}>
        {dataList.map((data) => {
          return (
            <Box sx={{ margin: "20px" }}>
              <Card
                id={data.userUniqId}
                sx={{
                  maxWidth: 345,
                  margin: "auto",
                  backgroundColor: "#eff5f5",
                  borderRadius: 3,
                  boxShadow: "2px 2px 5px #d6e4e5",
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      sx={{ color: "#497174", backgroundColor: "#cfffac" }}
                    >
                      {data.userName[0]}
                    </Avatar>
                  }
                  action={
                    <Button
                      onClick={() => handleFollow(data.userUniqId)}
                      variant={
                        checkFolloweOrNot(data.userUniqId)
                          ? "outlined"
                          : "contained"
                      }
                      size="small"
                      sx={{
                        textTransform: "lowercase",
                        marginTop: "8px",
                        marginRight: "7px",
                      }}
                    >
                      {checkFolloweOrNot(data.userUniqId)
                        ? "following"
                        : "follow"}
                    </Button>
                  }
                  title={data.userName}
                  subheader={data.userId}
                />
                <CardMedia
                  sx={{ borderRadius: 3, width: "90%", margin: "auto" }}
                  component="img"
                  image={data.imagePath}
                />
                <CardActions>
                  <Stack
                    sx={{ width: "90%", margin: "auto" }}
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography component="p" variant="h6" noWrap={true}>
                      {data.title}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {/* <IconButton
                        onClick={handleClick}
                        style={{ color: data.israted ? "gold" : "inherit" }}
                      >
                        {data.israted ? (
                          <StarIcon fontSize="large" />
                        ) : (
                          <StarOutlineIcon fontSize="large" />
                        )}
                      </IconButton> */}
                      <Rating
                        name="no-value"
                        value={data.rating}
                        precision={0.5}
                        onChange={(e, newValue) => {
                          setDataList(
                            dataList.map((d) =>
                              d._id === data._id
                                ? { ...d, rating: newValue }
                                : d
                            )
                          );
                        }}
                      />
                      {/* <Typography component="p" variant="p" noWrap={true}>
                        {data.rating}
                      </Typography> */}
                    </Stack>
                  </Stack>
                </CardActions>
                <CardContent sx={{ marginTop: -3 }}>
                  <Typography component="p" noWrap={true}>
                    {data.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          );
        })}
        <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={setOpen(false)};

      >
        <CircularProgress color="inherit" />
      </Backdrop>
      </Container>
    </>
  );
}

export default Home;
