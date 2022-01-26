import { Box, Avatar, Typography, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import styled from 'styled-components';

function SidebarRight() {
  return (
    <WrapperBox>
      <BoxCardUser>
        <BoxLeft>
          <Avatar alt="Remy Sharp" src="/images/avatar.jpg" />
          <Box sx={{ paddingLeft: '5px'}}>
            <Typography variant="h5">Remy Sharp</Typography>
            <Typography variant="body1">10k followers</Typography>
          </Box>
        </BoxLeft>
        <BoxRight>
          <Badge color="secondary" variant="dot">
            <NotificationsIcon />
          </Badge>
        </BoxRight>
      </BoxCardUser>
    </WrapperBox>
  )
}

const WrapperBox = styled(Box)`
  @media screen and (min-width: 901px) {
    position: sticky;
    top: 10px;
  }
`;

const BoxLeft = styled(Box)`
  width: calc(100% - 24px);
  padding-right: 15px;
  display: flex;
  align-items: center;
`;

const BoxRight = styled(Box)`
  width: 24px;
  .MuiBadge-dot {
    background-color: #C33020;
  }
`;

const BoxCardUser = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

export default SidebarRight;