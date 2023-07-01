import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import authApi from 'api/authApi';

function MyAccountScreen() {
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      setError(false);
      try {
        const response = await authApi.getInfo();
        if(response.data) {
          setUser(response.data);
        }
      } catch (error) { setError(true) }
    }
    fetchUser();
  }, []);

  return (
    <Box sx={{padding: '25px'}}>
      <Box sx={{textAlign: 'center', marginBottom: '60px'}}>
        {!error ? (
          <>
            <Typography variant='h1' sx={{ padding: { md: '15px 0', xs: '0 0 15px' }, fontWeight: 'bold', fontSize: { md: '38px', xs: '26px' } }}>Thông tin của tôi</Typography>
            <Box sx={{marginBottom: '10px'}}>{user.email}</Box>
            <Box>{user.name}</Box>
          </>
        ) : (
          <>
            <Box sx={{marginBottom: '10px'}}>Thông tin tài khoản không được tìm thấy</Box>
            <Box><NavLink to="/login">Đăng nhập ngay</NavLink></Box>
          </>
        )}
        
      </Box>
    </Box>
  )
}

export default MyAccountScreen;