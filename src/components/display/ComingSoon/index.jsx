import { Container, Grid, Box, Typography } from '@mui/material';

function ComingSoon() {
  return (
    <Container sx={{ paddingTop: '20px', paddingBottom: '20px', minHeight: 'calc(100vh - 60px)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Grid container justifyContent='center' alignItems='center' sx={{flexDirection: {md: 'row-reverse'}}}>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Typography variant='h1' sx={{fontWeight: 'bold', fontSize: '50px'}}>Coming soon</Typography>
            <Box sx={{fontSize: '30px', marginBottom: '15px'}}>Stay tuned</Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{'& > img': {maxWidth: '100%', height: 'auto'}}}>
          <img src='/images/coming-soon.png' alt='coming-soon' />
        </Grid>
      </Grid>
    </Container>
  )
}

export default ComingSoon;