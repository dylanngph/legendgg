import React , {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Box, Alert, TextField, OutlinedInput, Typography, Fade, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import CustomButton from 'components/custom/Button';
import ContainerAuth from 'components/display/ContainerAuth';
import { FieldBox, LabelBox } from 'components/custom/BoxForm';
import { validateEmail } from 'utils/helpers';
import authApi from 'api/authApi';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function SignUpScreen() {
  const [loading, setLoading] = useState(false);
  const [stateSuccess, setStateSuccess] = useState(false);
  const [error, setEror] = useState('');
  const [values, setValues] = useState({
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
    showPassword: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSignUp = async () => {
    setEror('');
    const validate = validator(values);
    if (validate !== '') {
      setEror(validate);
      return;
    }
    setLoading(true);
    try {
      const params = {
        email: values.email,
        password: values.password,
        name: values.name
      };
      const response = await authApi.signup(params);
      if(response.message === 'verify email') {
        setStateSuccess(true);
      }
      setLoading(false);
    } catch (error) { setLoading(false); }
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
    if (!values.email || !values.name || !values.password || !values.passwordConfirm) {
      return 'Vui lòng nhập đầy đủ';
    } else {
      if (!validateEmail(values.email)) return 'Email không đúng định dạng';
      if (values.password !== values.passwordConfirm) return 'Password không đúng';
      if (values.password.length < 8) return 'Password phải lớn hơn hoặc bằng 8 kí tự';
      return '';
    }
  };

  return (
    <Container>
      {!stateSuccess ?
      (
        <ContainerAuth>
          <Typography variant='h2' sx={{ margin: '0 auto', fontSize: { md: '30px', xs: '20px' }, textTransform: 'uppercase', textAlign: 'center'}}>Tham gia Legend Guild Game ngay bây giờ</Typography>
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
              <LabelBox>Tên</LabelBox>
                <TextField
                  fullWidth
                  name="name"
                  value={values.name}
                  onChange={handleInputChange}
                  placeholder="Tên"
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
            <FieldBox>
              <LabelBox>Nhập lại mật khẩu</LabelBox>
              <OutlinedInput
                id="passwordConfirm"
                name="passwordConfirm"
                type={values.showPassword ? 'text' : 'password'}
                value={values.passwordConfirm}
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
                onClick={() => handleSignUp(values)}
                className={loading ? 'loading-btn' : ''}
              >
                {!loading ? 'Tạo tài khoản ngay' : (<Fade
                  in={loading}
                  unmountOnExit
                >
                  <CircularProgress sx={{ color: '#ffffff', height: '20px!important', width: '20px!important',  }} />
                </Fade>)}
              </CustomButton>
            </FieldBox>
          </Box>
          <Box sx={{borderTop: '1px solid #eeeeee', marginTop: '20px', width: '400px', paddingTop: '20px', maxWidth: '100%', textAlign: 'center', '& a': { color: '#111111'}}}>
            <div>Bạn đã là thành viên?</div>
            <NavLink to="/login">Đăng nhập ngay</NavLink>
          </Box>
        </ContainerAuth>
      ) : (
        <ContainerAuth>
          <Box>Tạo tài khoản thành công! Vui lòng kiểm tra email của bạn.</Box>
        </ContainerAuth>
      )}
    </Container>
  )
}

export default SignUpScreen;