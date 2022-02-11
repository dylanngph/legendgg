import { NavLink } from 'react-router-dom';
import { Typography } from '@mui/material';

function NotFound() {
  return (
    <>
      <Typography variant='h2'>404 - Trang không tìm thấy</Typography>
      <NavLink to="/">Trở về trang chủ</NavLink>
    </>
  )
}

export default NotFound;