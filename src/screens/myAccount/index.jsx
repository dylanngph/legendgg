// import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import ComingSoon from 'components/display/ComingSoon';
// import authApi from 'api/authApi';

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
    <ComingSoon />
  )
}

export default MyAccountScreen;