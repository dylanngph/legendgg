import { Box, Skeleton } from '@mui/material';

function articleThumbLg() {
  return (
    <Box>
      <Skeleton variant="rectangular" animation="wave" width="100%" height={400} />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="100%" />
    </Box>
  )
}

export default articleThumbLg;