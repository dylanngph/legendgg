import React , {useState} from 'react';
import { validateEmail } from 'utils/helpers';
import { Container, Box, Alert, TextField, Typography, Fade, CircularProgress } from '@mui/material';
import ContainerAuth from 'components/display/ContainerAuth';
import { FieldBox } from 'components/custom/BoxForm';
import authApi from 'api/authApi';
import CustomButton from 'components/custom/Button';

function ForgotPasswordScreen() {
  const [error, setEror] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [stateSuccess, setStateSuccess] = useState(false);

  const handleForgotPassword = async () => {
    setEror('');
    const validate = validator();
    if (validate !== '') {
      setEror(validate);
      return;
    }
    setLoading(true);
    try {
      const params = {email: email};
      const response = await authApi.forgotPassword(params);
      if(response.message) {
        setStateSuccess(true);
      }
      setLoading(false);
    } catch (error) { setEror('Email không tồn tại'); setLoading(false); }
  }

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  }

  const validator = () => {
    if (!email) {
      return 'Vui lòng nhập email';
    } else {
      if (!validateEmail(email)) return 'Email không đúng định dạng';
      return '';
    }
  };

  return (
    <Container>
      {!stateSuccess ? (
      <ContainerAuth>
        <Typography variant='h2' sx={{ margin: '0 auto', fontSize: { md: '24px', xs: '18px' }, textAlign: 'center'}}>Nhập email để lấy lại mật khẩu</Typography>
        <Box sx={{ marginTop: '10px', maxWidth: '90%' }}>
          <FieldBox>
            <TextField
              fullWidth
              name="email"
              value={email}
              onChange={handleInputChange}
              placeholder="your-email@gmail.com"
              variant="outlined"
            />
          </FieldBox>
          <FieldBox sx={{ marginTop: '20px' }}>
            {error && <Box sx={{ marginBottom: '10px' }}><Alert severity="error">{error}</Alert></Box>}
            <CustomButton 
              variant="contained"
              onClick={() => handleForgotPassword()}
              className={loading ? 'loading-btn' : ''}
            >
              {!loading ? 'Lấy lại mật khẩu' : (<Fade
                in={loading}
                unmountOnExit
              >
                <CircularProgress sx={{ color: '#ffffff', height: '20px!important', width: '20px!important',  }} />
              </Fade>)}
            </CustomButton>
          </FieldBox>
        </Box>
      </ContainerAuth>
      ) : (
        <ContainerAuth>
          <Box>Vui lòng kiểm tra email để lấy lại mật khẩu</Box>
        </ContainerAuth>
      )}
    </Container>
  )
}

export default ForgotPasswordScreen;