import React, { useState } from 'react';
import { Box, Avatar, Typography, Badge, Collapse } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { NavLink } from 'react-router-dom';
import { user, navBarUser } from '../../../constants/data/user';
import styled from 'styled-components';

function SidebarRight() {
  const [stateMenuUser, setStateMenuUser] = useState(false);

  const handleOpenMenuUser = () => {
    setStateMenuUser((prev) => !prev);
  };

  return (
    <WrapperBox>
      <BoxCardUser>
        <BoxLeft>
          <Avatar alt={user.name} src={user.avatar} onClick={() => handleOpenMenuUser()} />
          <Box sx={{ paddingLeft: '5px'}}>
            <Typography variant="h5" onClick={() => handleOpenMenuUser()}>{user.name}</Typography>
            <Typography variant="body1">{`${user.follower}k followers`}</Typography>
          </Box>
        </BoxLeft>
        <BoxRight>
          {/* <Badge color="secondary" variant="dot">
            <NotificationsIcon />
          </Badge> */}
          <Badge>
            <NotificationsIcon />
          </Badge>
        </BoxRight>
      </BoxCardUser>
      <Collapse in={stateMenuUser}>
        <BoxNavMenu>
          {navBarUser.map((item) => (
            <NavLink key={item.title} to={item.href}>{item.title}</NavLink>
          ))}
          <div className='animation-wrap'></div>
        </BoxNavMenu>
        </Collapse>
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
  img, h5 {
    cursor: pointer;
  }
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

const BoxNavMenu = styled(Box)`
  a {
    display: block;
    color: #B0AEB5;
    text-decoration: none;
  }
`;

export default SidebarRight;