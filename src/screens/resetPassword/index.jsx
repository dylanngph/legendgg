import React, { useState, useMemo } from 'react';
import CustomButton from 'components/custom/Button';
import { Box, OutlinedInput,IconButton, InputAdornment, Fade, Alert, CircularProgress } from '@mui/material';
import { FieldBox, LabelBox } from 'components/custom/BoxForm';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import authApi from 'api/authApi';
import ContainerAuth from 'components/display/ContainerAuth';
import NotFound from 'components/display/NotFound';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), search);
}

function ResetPasswordScreen() {
  let query = useQuery();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setEror] = useState('');
  const [loading, setLoading] = useState(false);
  const [stateSuccess, setStateSuccess] = useState(false);

  if (!query.get('token')) {
    navigate('/');
  }

  const handleResetPassword = async () => {
    setEror('');
    const validate = validatorPassword();
    if (validate !== '') {
      setEror(validate);
      return;
    }
    setLoading(true);
    try {
      const params = {
        token: query.get('token'),
        newPassword: newPassword,
      };
      const response = await authApi.resetPassword(params);
      if(response.message) {
        setStateSuccess(true);
      }
      setLoading(false);
    } catch (error) { setLoading(false); }
  }

  const handleInputChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleClickShowPassword = (event) => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validatorPassword = () => {
    if (!newPassword) {
      return 'Vui lòng nhập password';
    } else {
      if (newPassword.length < 8) return 'Password phải lớn hơn hoặc bằng 8 kí tự';
      return '';
    }
  };
  
  return (
    <ContainerAuth>
      {query.get('token') ? (
        <>
          {!stateSuccess && (<>
          <Box sx={{fontSize: '18px', textTransform: 'uppercase'}}>Thay đổi password</Box>
          <FieldBox>
            <LabelBox>Mật khẩu mới</LabelBox>
              <OutlinedInput
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={handleInputChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
          </FieldBox>
          <FieldBox sx={{ marginTop: '20px' }}>
            {error && <Box sx={{ marginBottom: '10px' }}><Alert severity="error">{error}</Alert></Box>}
            <CustomButton 
              variant="contained"
              onClick={() => handleResetPassword()}
              className={loading ? 'loading-btn' : ''}
            >
              {!loading ? 'Thay đổi mật khẩu' : (<Fade
                in={loading}
                unmountOnExit
              >
                <CircularProgress sx={{ color: '#ffffff', height: '20px!important', width: '20px!important',  }} />
              </Fade>)}
            </CustomButton>
          </FieldBox>
          </>)}
          {stateSuccess && (<Box sx={{ marginBottom: '10px' }}>
            <Alert severity="success">Thay đổi mật khẩu thành công</Alert>
            <Box sx={{borderTop: '1px solid #eeeeee', marginTop: '20px', width: '400px', paddingTop: '20px', maxWidth: '100%', textAlign: 'center', '& a': { color: '#111111'}}}>
              <NavLink to="/login">Đăng nhập ngay</NavLink>
            </Box>
          </Box>)}
        </>
      ) : (
        <NotFound />
      )}
      
    </ContainerAuth>
  )
}

export default ResetPasswordScreen;