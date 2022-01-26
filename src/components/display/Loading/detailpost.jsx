import { Skeleton } from '@mui/material';

function LoadingDetailPost() {
  return (
    <>
      <Skeleton animation="wave" width="80%" height={125} />
      <Skeleton variant="rectangular" width="100%" height={200} />
      <Skeleton animation="wave" width="60%" height={40} />
      <Skeleton animation="wave" width="100%" height={40} />
    </>
  )
}

export default LoadingDetailPost;