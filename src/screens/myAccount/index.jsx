import { useState, useEffect } from 'react';
import CustomButton from 'components/custom/Button';
import { NavLink } from 'react-router-dom';
import { Box, OutlinedInput,IconButton, InputAdornment, Fade, Alert, CircularProgress } from '@mui/material';
import { FieldBox, LabelBox } from 'components/custom/BoxForm';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import authApi from 'api/authApi';
import useToken from 'utils/hooks/useToken';

function MyAccountScreen() {
  // const [user, setUser] = useState({});
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await authApi.getInfo();
  //       console.log('>> response.data ', response.data);
  //       if(response.data) {
  //         setUser(true);
  //       }
  //     } catch (error) { }
  //   }
  //   fetchUser();
  // }, []);

  return (
    <Box sx={{padding: '25px'}}>
      <Box sx={{fontSize: '18px', textTransform: 'uppercase'}}>Thông tin của tôi</Box>
    </Box>
  )
}

export default MyAccountScreen;