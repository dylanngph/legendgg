import { useState } from 'react';
import { Grid, Box, Typography, TextField, TextareaAutosize, Fade, CircularProgress, Alert } from '@mui/material';
import { ReactComponent as CallIcon } from 'icons/call.svg';
import { ReactComponent as LocationIcon } from 'icons/location.svg';
import { ReactComponent as SMSIcon } from 'icons/sms.svg';
import { FieldBox, LabelBox } from 'components/custom/BoxForm';
import CustomButton from 'components/custom/Button';
import { validateEmail } from 'utils/helpers';
import { CONTACT_SETTING } from 'constants/data/contact';
import contactApi from 'api/contactApi';
import styled from 'styled-components';

function ContactScreen() {

  const [stateSuccess, setStateSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setEror] = useState('');
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleInputChangeTextarea = (event) => {
    const valTpm = values;
    valTpm.message = event.target.value;
    setValues(valTpm);
  }

  const handleSend = async () => {
    setEror('');
    const validate = validator(values);
    if (validate !== '') {
      setEror(validate);
      return;
    }
    setLoading(true);
    try {
      const params = values;
      const response = await contactApi.postForm(params);
      if(response.data) {
        setStateSuccess(true);
      }
      setLoading(false);
    } catch (e) {
      setEror(e.message);
      setLoading(false);
    }
  };

  const validator = () => {
    if (!values.firstName || !values.lastName || !values.email || !values.message) {
      return 'Vui lòng nhập đầy đủ';
    } else {
      if (!validateEmail(values.email)) return 'Email không đúng định dạng';
      return '';
    }
  };

  return (
    <Box sx={{padding: '25px'}}>
      <Box sx={{textAlign: 'center', marginBottom: '60px'}}>
        <Typography variant='h1' sx={{ padding: { md: '15px 0', xs: '0 0 15px' }, fontWeight: 'bold', fontSize: { md: '38px', xs: '26px' } }}>Liên hệ với chúng tôi</Typography>
        <div>Chúng tôi sẵn sàng dẫn dắt bạn trong tương lai</div>
      </Box>
      <Box sx={{ maxWidth: {lg: '900px'}, margin: '0 auto' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ maxWidth: '100%', margin: '0 auto', width: { sm: '400px', xs: 'inherit'} }}>
              <BoxInfo>
                <BoxTitle>
                  <LocationIcon />
                  <Box sx={{ marginLeft: '10px'}}>Địa chỉ</Box>
                </BoxTitle>
                <BoxContent>{CONTACT_SETTING.address}</BoxContent>
              </BoxInfo>
              <BoxInfo>
                <BoxTitle>
                  <CallIcon />
                  <Box sx={{ marginLeft: '10px'}}>Số điện thoại</Box>
                </BoxTitle>
                <BoxContent><a href={`tel:${CONTACT_SETTING.phone.replaceAll(' ', '')}`}>{CONTACT_SETTING.phone}</a></BoxContent>
              </BoxInfo>
              <BoxInfo>
                <BoxTitle>
                  <SMSIcon />
                  <Box sx={{ marginLeft: '10px'}}>Email</Box>
                </BoxTitle>
                <BoxContent>Email: <a href={`mailto:${CONTACT_SETTING.email}`}>{CONTACT_SETTING.email}</a></BoxContent>
              </BoxInfo>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
          {!stateSuccess && (
            <Box sx={{ backgroundColor: '#f5f5f5', borderRadius: '6px', padding: '24px', maxWidth: '100%', margin: '0 auto', width: { md: '400px'} }}>
              <FieldBox sx={{width: '100%'}}>
                <LabelBox sx={{fontWeight: '600'}}>Tên</LabelBox>
                  <WrapperInput>
                    <TextField
                      fullWidth
                      name="firstName"
                      value={values.firstName}
                      onChange={handleInputChange}
                      placeholder="Nhập vào tên của bạn"
                      variant="outlined"
                    />
                  </WrapperInput>
              </FieldBox>
              <FieldBox sx={{width: '100%'}}>
                <LabelBox sx={{fontWeight: '600'}}>Họ</LabelBox>
                <WrapperInput>
                  <TextField
                    fullWidth
                    name="lastName"
                    value={values.lastName}
                    onChange={handleInputChange}
                    placeholder="Nhập vào họ của bạn"
                    variant="outlined"
                  />
                </WrapperInput>
              </FieldBox>
              <FieldBox sx={{width: '100%'}}>
                <LabelBox sx={{fontWeight: '600'}}>Email</LabelBox>
                <WrapperInput>
                  <TextField
                    fullWidth
                    name="email"
                    value={values.email}
                    onChange={handleInputChange}
                    placeholder="Nhập vào email của bạn"
                    variant="outlined"
                  />
                </WrapperInput>
              </FieldBox>
              <FieldBox sx={{width: '100%'}}>
                <LabelBox sx={{fontWeight: '600'}}>Lời nhắn</LabelBox>
                <WrapperInput>
                  <TextareaAutosize
                    aria-label="minimum height"
                    minRows={4}
                    placeholder="Nhập vào lời nhắn của bạn"
                    style={{ width: 200 }}
                    value={values.massage}
                    name="massage"
                    onChange={handleInputChangeTextarea}
                  />
                </WrapperInput>
              </FieldBox>
              <FieldBox sx={{ marginTop: '20px', width: '100%' }}>
                {error && <Box sx={{ marginBottom: '10px' }}><Alert severity="error">{error}</Alert></Box>}
                <CustomButton 
                  variant="contained"
                  onClick={() => handleSend(values)}
                  className={loading ? 'loading-btn' : ''}
                >
                  {!loading ? 'Gửi' : (<Fade
                    in={loading}
                    unmountOnExit
                  >
                    <CircularProgress sx={{ color: '#ffffff', height: '20px!important', width: '20px!important',  }} />
                  </Fade>)}
                </CustomButton>
              </FieldBox>
            </Box>
          )}
          {stateSuccess && (
            <Alert severity="success">Gửi liên hệ thành công</Alert>
          )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

const BoxInfo = styled.div`
  padding: 24px 0;
  border-bottom: 1px solid #eeeeee;
`;
const BoxTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  color: #432C32;
  font-size: 20px;
  line-height: 32px;
`;
const BoxContent = styled.div`
  color: #B0AEB5;
  line-height: 32px;
  a {
    color: #B0AEB5;
    text-decoration: none;
  }
`;

const WrapperInput = styled.div`
  .MuiInputBase-input {
    background-color: #ffffff;
    border-radius: 6px;
  }
  .MuiOutlinedInput-notchedOutline {
    border-color: transparent;
  }
  textarea {
    width: calc(100% - 30px)!important;
    background-color: #ffffff;
    border-color: transparent;
    padding: 16.5px 14px;
    font-family: 'Open Sans';
    font-size: 16px;
    border-radius: 6px;
    &:hover {
      border-color: #95008A;
    }
    &:focus {
      outline-color: #95008A;
    }
  }
`;

export default ContactScreen;