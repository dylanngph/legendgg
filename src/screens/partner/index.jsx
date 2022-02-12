import { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import partnerApi from 'api/partnerApi';

function PartnerScreen() {
  // const [loading, setLoading] = useState(false);
  const [listPartner, setListPartner] = useState([]);

  useEffect(() => {
    const listPartner = async () => {
      // setLoading(true);
      try {
        const response = await partnerApi.getAll();
        setListPartner(response.data);
        // setLoading(false);
      } catch (error) { }
    }
    listPartner();
  }, []);

  return (
    <Box sx={{padding: '25px'}}>
      <Box sx={{textAlign: 'center', marginBottom: '60px'}}>
        <Typography variant='h1' sx={{ padding: { md: '15px 0', xs: '0 0 15px' }, fontWeight: 'bold', fontSize: { md: '38px', xs: '26px' } }}> Our Partners </Typography>
        <div>We’ve integrated with the below partners and more.</div>
      </Box>
      {listPartner.length > 0 && (
        <Grid container justifyContent='center' spacing={2}>
        {listPartner.map((partner, index) => (
          <Grid key={index} item xs={6} sm={4} md={2.4}>
            <a href={partner.website} target='_blank' rel="noreferrer">
              <Box sx={{ '& img': {width: '100%', maxWidth: '100%', height: 'auto'} }}>
                <img src={partner.logo} alt={partner.name} />
              </Box>
            </a>
          </Grid>
        ))}
        </Grid>
      )}
    </Box>
  )
}

export default PartnerScreen;