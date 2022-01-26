import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppBar, SwipeableDrawer, Box, Button, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeScreen from './screens/home';
import AboutScreen from './screens/about';
import PostScreen from './screens/post';
import SettingScreen from './screens/setting';
import SidebarLeft from './components/display/SidebarLeft';
import SidebarRight from './components/display/SidebarRight';
import styled from 'styled-components';

const widthSideLeft = 80;
const widthSideRight = 250;

function App() {
  const [state, setState] = useState({
    left: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ backgroundColor: '#080811', height: '100%', color: '#fff' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {anchor === 'left' ? <Box sx={{ width: '80px' }}><SidebarLeft /></Box> : <Box sx={{ width: '200px', padding: '15px' }}><SidebarRight /></Box>}
    </Box>
  );

  return (
    <BrowserRouter>
      <BoxContainer>
        <BoxLeft>
          <SidebarLeft />
        </BoxLeft>
        <BoxMain>
          <AppBar color='secondary'>
          {['left', 'right'].map((anchor) => (
            <Box key={anchor}>
              <React.Fragment>
                <Button sx={{ marginTop: '5px' }} onClick={toggleDrawer(anchor, true)}>
                  {anchor === 'left' ? <MenuIcon sx={{ color: '#fff' }} /> : <Avatar alt="Remy Sharp" src="/images/avatar.jpg" sx={{ width: '24px', height: '24px' }} />}
                </Button>
                <SwipeableDrawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                  onOpen={toggleDrawer(anchor, true)}
                >
                  {list(anchor)}
                </SwipeableDrawer>
              </React.Fragment>
            </Box>
          ))}
          </AppBar>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/about" element={<AboutScreen />} />
            <Route path="/setting" element={<SettingScreen />} />
            <Route path="/post/:articleSlug" element={<PostScreen />} />
          </Routes>
        </BoxMain>
        <BoxRight>
          <SidebarRight />
        </BoxRight>
      </BoxContainer>
    </BrowserRouter>
  );
}

const BoxContainer = styled(Box)`
  display: flex;
  min-height: 100vh;
`;

const BoxLeft = styled(Box)`
  width: ${widthSideLeft}px;
  background-color: #080811;
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const BoxMain = styled.main`
  width: calc(100% - ${widthSideLeft + widthSideRight}px);
  @media screen and (max-width: 900px) {
    width: 100%;
    padding-top: 50px;
  }
`;

const BoxRight = styled(Box)`
  width: ${widthSideRight}px;
  background-color: #080811;
  padding: 10px 15px;
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

export default App;
