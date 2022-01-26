import { Grid, Skeleton } from '@mui/material';

function LoadingListPost() {
  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <Skeleton variant="rectangular" width="100%" height={150} />
        <Skeleton animation="wave" width="80%" height={40} />
        <Skeleton animation="wave" width="60%" height={40} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Skeleton variant="rectangular" width="100%" height={150} />
        <Skeleton animation="wave" width="80%" height={40} />
        <Skeleton animation="wave" width="60%" height={40} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Skeleton variant="rectangular" width="100%" height={150} />
        <Skeleton animation="wave" width="80%" height={40} />
        <Skeleton animation="wave" width="60%" height={40} />
      </Grid>
    </>
  )
}

export default LoadingListPost;