import { useState, useEffect } from 'react';
import { Box, Grid, Typography, Skeleton } from '@mui/material';
import partnerApi from 'api/partnerApi';

function PartnerScreen() {
  const [loading, setLoading] = useState(false);
  const [listPartner, setListPartner] = useState([]);

  const listInvest = [
    {
      src: 'images/Jadelabs_logo.jpg',
      name: 'Jadelabs',
      url: 'https://www.jadelabs.org/'
    },
    {
      src: 'images/trustpaygroup_logo.png',
      name: 'TPH ventures',
      url: 'https://trustpaygroup.com/'
    }
  ]

  useEffect(() => {
    const listPartner = async () => {
      setLoading(true);
      try {
        const response = await partnerApi.getAll();
        setListPartner(response.data);
        setLoading(false);
      } catch (error) { setLoading(false); }
    }
    listPartner();
  }, []);

  return (
    <Box sx={{ padding: '25px' }}>
      <Box sx={{ textAlign: 'center', marginBottom: '40px' }}>
        <Typography variant='h1' sx={{ padding: { md: '15px 0', xs: '0 0 15px' }, fontWeight: 'bold', fontSize: { md: '38px', xs: '26px' } }}>Cố vấn của chúng tôi</Typography>
      </Box>

      <Grid container justifyContent='center' alignItems='center' spacing={10} sx={{ marginBottom: '60px' }}>
        {listInvest.map((invest, index) => (
          <Grid key={index} item xs={6} sm={4} md={2.8}>
            <a href={invest.url} target='_blank' rel="noreferrer">
              <Box sx={{ '& img': { width: '100%', maxWidth: '100%', height: 'auto' } }}>
                <img src={invest.src} alt={invest.name} />
              </Box>
            </a>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'center', marginBottom: '40px' }}>
        <Typography variant='h1' sx={{ padding: { md: '15px 0', xs: '0 0 15px' }, fontWeight: 'bold', fontSize: { md: '38px', xs: '26px' } }}>Đối tác của chúng tôi</Typography>
        <div>Chúng tôi đã hợp tác với các đối tác bên dưới và hơn thế nữa.</div>
      </Box>
      {loading && (
        <Grid container justifyContent='center' alignItems='center' spacing={2}>
          <Grid item xs={6} sm={4} md={2.4}>
            <Skeleton animation="wave" variant="rectangular" width="100%" height={120} />
          </Grid>
          <Grid item xs={6} sm={4} md={2.4}>
            <Skeleton animation="wave" variant="rectangular" width="100%" height={120} />
          </Grid>
          <Grid item xs={6} sm={4} md={2.4}>
            <Skeleton animation="wave" variant="rectangular" width="100%" height={120} />
          </Grid>
          <Grid item xs={6} sm={4} md={2.4}>
            <Skeleton animation="wave" variant="rectangular" width="100%" height={120} />
          </Grid>
        </Grid>
      )}
      {!loading && (
        <>
          {listPartner.length > 0 && (
            <Grid container justifyContent='center' alignItems='center' spacing={2}>
              {listPartner.map((partner, index) => (
                <Grid key={index} item xs={6} sm={4} md={2.4}>
                  <a href={partner.website} target='_blank' rel="noreferrer">
                    <Box sx={{ '& img': { width: '100%', maxWidth: '100%', height: 'auto' } }}>
                      <img src={partner.logo} alt={partner.name} />
                    </Box>
                  </a>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </Box>
  )
}

export default PartnerScreen;