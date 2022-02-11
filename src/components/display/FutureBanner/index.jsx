import { Grid } from '@mui/material';
import ListPopular from 'components/display/ListPopular';
import ListNew from 'components/display/ListNew';

function FutureBanner() {
  return (
    <Grid container mt={3}>
      <Grid item xs={12} md={3}>
        <ListPopular />
      </Grid>
      <Grid item xs={12} md={9}>
        <ListNew />
      </Grid>
    </Grid>
  )
}

export default FutureBanner;