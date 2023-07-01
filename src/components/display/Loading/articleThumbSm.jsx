import { Box, Skeleton } from '@mui/material';

function articleThumbSm() {
  return (
    <Box>
      <Skeleton variant="rectangular" animation="wave" width="100%" height={100} />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="100%" />
    </Box>
  )
}

export default articleThumbSm;