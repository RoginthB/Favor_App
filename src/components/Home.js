import React, { useEffect, useState }  from 'react'
import { Box, Container, IconButton, Stack, Typography } from '@mui/material'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button'
import StarOutlineIcon from '@mui/icons-material/StarOutlineRounded';
import StarIcon from '@mui/icons-material/StarRounded';
//import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import axios from 'axios';


function Home() {
  const [isFilled, setIsFilled] = useState(false);
  const [isFollowed, setFollowed] = useState(false);
  const [dataList, setDataList] =useState([]);

  useEffect(()=>{
    getData();
    },[]);

  const getData=()=>{
    axios.get(process.env.REACT_APP_API_URL+'/images/').then(res=>{
      setDataList(res.data)
      //console.log(res.data);
    })
  }
  const handleClick = () => {
    setIsFilled(!isFilled);
  };
  const handleFollow =()=>{
    setFollowed(!isFollowed);
  }

  return (
    <>
      <Container maxWidth="md" sx={{ marginTop: '80px',marginBottom:'80px' }}>
        {dataList.map((data) => {
          return <Box sx={{margin:'20px'}}>
            <Card sx={{ maxWidth: 345, margin: 'auto', backgroundColor: '#eff5f5', borderRadius: 3, boxShadow: '2px 2px 5px #d6e4e5' }} >
              <CardHeader
                avatar={<Avatar sx={{ color: '#497174' ,backgroundColor:'#cfffac' }} >{data.userName[0]}</Avatar>}
                action={
                  <Button onClick={handleFollow} variant={ isFollowed ? 'outlined' :'contained'} size='small' sx={{textTransform:'lowercase' 
                  ,marginTop:'8px', marginRight:'7px'}}>{isFollowed? 'following': 'follow'}</Button>
                }
                title={data.userName}
                subheader={data.userId}
              />
              <CardMedia sx={{ borderRadius: 3, width: '90%', margin: 'auto' }}
                component='img'
                image={data.imagePath}
              />
              <CardActions>
              <Stack sx={{width:'90%',margin:'auto'}} direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                  <Typography component='p' variant='h6' noWrap={true} >{data.title}</Typography>
                <Stack direction="row" spacing={1} alignItems="center" >
                  
                  <IconButton onClick={handleClick} style={{ color: data.israted ? 'gold' : 'inherit' }}>
                    {data.israted ? <StarIcon fontSize="large"/> : <StarOutlineIcon fontSize="large"/>}
                  </IconButton>
                <Typography component='p' variant='p' noWrap={true}>{data.rating}</Typography>
                </Stack>
                </Stack>
              </CardActions>
              <CardContent sx={{ marginTop: -3 }}>
                <Typography component='p' noWrap={true} >
                  {data.description}
                </Typography>
              </CardContent>

            </Card>
          </Box>


        })}


      </Container>
    </>
  )
}




export default Home