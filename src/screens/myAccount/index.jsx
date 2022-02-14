import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import authApi from 'api/authApi';

function MyAccountScreen() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authApi.getInfo();
        console.log('>> response.data ', response.data);
        if(response.data) {
          setUser(response.data);
        }
      } catch (error) { }
    }
    fetchUser();
  }, []);

  return (
    <Box sx={{padding: '25px'}}>
      <Box sx={{textAlign: 'center', marginBottom: '60px'}}>
        <Typography variant='h1' sx={{ padding: { md: '15px 0', xs: '0 0 15px' }, fontWeight: 'bold', fontSize: { md: '38px', xs: '26px' } }}>Thông tin của tôi</Typography>
        <Box sx={{marginBottom: '10px'}}>{user.email}</Box>
        <Box>{user.name}</Box>
      </Box>
    </Box>
  )
}

export default MyAccountScreen;