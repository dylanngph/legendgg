import { Grid, Skeleton } from '@mui/material';

function LoadingArticleSm() {
  return (
    <Grid container spacing={2} sx={{height: '100px'}}>
      <Grid item xs={4}>
        <Skeleton variant="rectangular" width="100%" height={60} />
      </Grid>
      <Grid item xs={8}>
        <Skeleton variant="text" animation="wave" width="80%" />
        <Skeleton variant="text" width="100%"  />
        <Skeleton variant="text" animation="wave" width="100%" />
      </Grid>
    </Grid>
  )
}

export default LoadingArticleSm;