import { Grid, Skeleton } from '@mui/material';

function LoadingArticleLg() {
  return (
    <Grid container spacing={2} sx={{height: '100px'}}>
      <Grid item xs={12} md={6}>
        <Skeleton variant="rectangular" width="100%" height={300} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Skeleton variant="text" animation="wave" width="80%" />
        <Skeleton variant="text" width="100%"  />
        <Skeleton variant="text" animation="wave" width="100%" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" animation="wave" width="100%" />
      </Grid>
    </Grid>
  )
}

export default LoadingArticleLg;