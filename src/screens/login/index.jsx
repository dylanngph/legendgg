import React , {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Container, Box, Alert, TextField, Typography, Fade, CircularProgress, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { validateEmail } from 'utils/helpers';
import { FieldBox, LabelBox } from 'components/custom/BoxForm';
import ContainerAuth from 'components/display/ContainerAuth';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CustomButton from 'components/custom/Button';
import authApi from 'api/authApi';
import useToken from 'utils/hooks/useToken';
import { useDispatch } from 'react-redux';
import { changeStateNavUserMenu } from 'redux/layout/layout.action';

function LoginScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, setToken } = useToken();
  const [error, setEror] = useState('');
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  const handleLogin = async () => {
    setEror('');
    const validate = validator(values);
    if (validate !== '') {
      setEror(validate);
      return;
    }
    setLoading(true);
    try {
      const params = {...values};
      const response = await authApi.login(params);
      if(response) {
        setToken(response.data.accessToken);
        dispatch(changeStateNavUserMenu());
        navigate('/');
      }
      setLoading(false);
    } catch (error) { setEror('Email hoặc password không đúng'); setLoading(false); }
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validator = () => {
    if (!values.email || !values.password) {
      return 'Vui lòng nhập đầy đủ';
    } else {
      if (!validateEmail(values.email)) return 'Email không đúng định dạng';
      return '';
    }
  };

  return (
    <Container>
      <ContainerAuth>
        <Typography variant='h2' sx={{ margin: '0 auto', fontSize: { md: '30px', xs: '20px' }, textTransform: 'uppercase', textAlign: 'center'}}>Đăng nhập vào Legend Guild Game</Typography>
        <Box sx={{ marginTop: '10px', maxWidth: '90%' }}>
          <FieldBox>
            <LabelBox>Địa chỉ email</LabelBox>
              <TextField
                fullWidth
                name="email"
                value={values.email}
                onChange={handleInputChange}
                placeholder="your-email@gmail.com"
                variant="outlined"
              />
          </FieldBox>
          <FieldBox>
            <LabelBox>Mật khẩu</LabelBox>
            <OutlinedInput
              id="password"
              name="password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleInputChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FieldBox>
          <FieldBox sx={{ marginTop: '20px' }}>
            {error && <Box sx={{ marginBottom: '10px' }}><Alert severity="error">{error}</Alert></Box>}
            <CustomButton 
              variant="contained"
              onClick={() => handleLogin(values)}
              className={loading ? 'loading-btn' : ''}
            >
              {!loading ? 'Đăng nhập' : (<Fade
                in={loading}
                unmountOnExit
              >
                <CircularProgress sx={{ color: '#ffffff', height: '20px!important', width: '20px!important',  }} />
              </Fade>)}
            </CustomButton>
          </FieldBox>
        </Box>
        <Box sx={{borderTop: '1px solid #eeeeee', marginTop: '20px', width: '400px', paddingTop: '20px', maxWidth: '100%', textAlign: 'center', '& a': { color: '#111111'}}}>
          <div>Chưa có tài khoản</div>
          <div><NavLink to="/sign-up">Đăng ký ngay</NavLink></div>
          <NavLink to="/forgot-password">Quên mật khẩu?</NavLink>
        </Box>
      </ContainerAuth>
    </Container>
  )
}

export default LoginScreen;