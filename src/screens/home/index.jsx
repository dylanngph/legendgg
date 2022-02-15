import { Grid } from '@mui/material';
import FutureBanner from 'components/display/FutureBanner';
import ListArticleSection from 'components/display/ListArticleSection';
import ListRising from 'components/display/ListRising';

function HomeScreen() {
  return (
    <div>
      <Grid container sx={{flexDirection: {xs: 'column-reverse', md: 'row'}, maxWidth: '100%'}}>
        <Grid item xs={12} md={10} sx={{maxWidth: '100%'}}>
          <FutureBanner />
          <ListArticleSection />
        </Grid>
        <Grid item xs={12} md={2} sx={{maxWidth: '100%'}}>
          <ListRising />
        </Grid>
      </Grid>
    </div>
  )
}

export default HomeScreen;