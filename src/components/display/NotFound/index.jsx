import { NavLink } from 'react-router-dom';
import { Container, Grid, Box, Typography } from '@mui/material';

function NotFound() {
  return (
    <Container sx={{ paddingTop: '20px', paddingBottom: '20px', minHeight: 'calc(100vh - 60px)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Grid container justifyContent='center' alignItems='center'>
        <Grid item xs={12} md={6} sx={{'& > img': {maxWidth: '100%', height: 'auto'}}}>
          <img src='/images/404-image.png' alt='404' />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Typography variant='h1' sx={{fontWeight: 'bold'}}>404</Typography>
            <Box sx={{fontSize: '30px', marginBottom: '15px'}}>Page not found</Box>
            <Box sx={{color: '#B0AEB5', textAlign: 'center'}}>We’re sorry, the page you requested could not be found.<br />Please go back to the homepage.</Box>
            <Box sx={{marginTop: '20px', '& > a': {display: 'block', padding: '10px 15px', borderRadius: '5px', backgroundColor: '#111111', color: '#fff', textDecoration: 'none', fontWeight: '500'}}}>
            <NavLink to="/">Trở về trang chủ</NavLink>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default NotFound;