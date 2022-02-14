import { useState, useEffect } from 'react';
import { Grid, Box, Typography, TextField, TextareaAutosize, Fade, CircularProgress, Alert } from '@mui/material';
import { ReactComponent as CallIcon } from 'icons/call.svg';
import { ReactComponent as LocationIcon } from 'icons/location.svg';
import { ReactComponent as SMSIcon } from 'icons/sms.svg';
import { FieldBox, LabelBox } from 'components/custom/BoxForm';
import CustomButton from 'components/custom/Button';
import { validateEmail } from 'utils/helpers';
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
    setValues({ ...values, ['message']: event.target.value });
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
    console.log('>> ', values);
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
        <Typography variant='h1' sx={{ padding: { md: '15px 0', xs: '0 0 15px' }, fontWeight: 'bold', fontSize: { md: '38px', xs: '26px' } }}>Contact Us</Typography>
        <div>We are ready to lead you into the future</div>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box sx={{ maxWidth: '100%', margin: '0 auto', width: { sm: '400px', xs: 'inherit'} }}>
            <BoxInfo>
              <BoxTitle>
                <LocationIcon />
                <Box sx={{ marginLeft: '10px'}}>Address</Box>
              </BoxTitle>
              <BoxContent>138 Robinson Road #02-50 Singapore 068906</BoxContent>
            </BoxInfo>
            <BoxInfo>
              <BoxTitle>
                <CallIcon />
                <Box sx={{ marginLeft: '10px'}}>Phone</Box>
              </BoxTitle>
              <BoxContent><a href="tel:6596416855">+65 9641 6855</a></BoxContent>
            </BoxInfo>
            <BoxInfo>
              <BoxTitle>
                <SMSIcon />
                <Box sx={{ marginLeft: '10px'}}>Email</Box>
              </BoxTitle>
              <BoxContent>Email: <a href="mailto:hi@cgstudio.org">hi@cgstudio.org</a></BoxContent>
            </BoxInfo>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
        {!stateSuccess && (
          <Box sx={{ backgroundColor: '#f5f5f5', borderRadius: '6px', padding: '24px', maxWidth: '100%', margin: '0 auto', width: { md: '400px'} }}>
            <FieldBox sx={{width: '100%'}}>
              <LabelBox sx={{fontWeight: '600'}}>First Name</LabelBox>
                <WrapperInput>
                  <TextField
                    fullWidth
                    name="firstName"
                    value={values.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    variant="outlined"
                  />
                </WrapperInput>
            </FieldBox>
            <FieldBox sx={{width: '100%'}}>
              <LabelBox sx={{fontWeight: '600'}}>Last Name</LabelBox>
              <WrapperInput>
                <TextField
                  fullWidth
                  name="lastName"
                  value={values.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
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
                  placeholder="Enter your email"
                  variant="outlined"
                />
              </WrapperInput>
            </FieldBox>
            <FieldBox sx={{width: '100%'}}>
              <LabelBox sx={{fontWeight: '600'}}>Message</LabelBox>
              <WrapperInput>
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={4}
                  placeholder="Enter your message"
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
                {!loading ? 'Send' : (<Fade
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
          <Alert severity="success">Sent successfully</Alert>
        )}
        </Grid>
      </Grid>
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