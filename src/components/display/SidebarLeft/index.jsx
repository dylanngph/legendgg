import React from 'react';
import { navBar } from '../../../constants/data/navbar';
import { NavLink } from 'react-router-dom';
import { Box } from '@mui/material';
import styled, { css } from 'styled-components';

const activeClassName = "active";
const heightNavLink = 59;
const heightAnimation = 48;

function SidebarLeft({widthSideLeft}) {
  return (
    <WrapperBox>
      <BoxLogo>
        <NavLink to="/">
          <img src="/logo.png" alt="logo" width="80px" />
        </NavLink>
      </BoxLogo>
      <BoxNavMenu>
        {navBar.map((item) => (
          <NavLink key={item.title} to={item.href} className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }>
              <MenuItems>
                <item.icon fontSize="large"/>
                <Box>
                  {item.title}
                </Box>
              </MenuItems>
            
          </NavLink>
        ))}
        <div className='animation-wrap'></div>
      </BoxNavMenu>
    </WrapperBox>
  )
}

function createCSSAnimation() {
  let styles = '';
  for (let i = 0; i < navBar.length; i += 1) {
    styles += `
      a:nth-child(${i+1}).active ~ .animation-wrap {
        top: ${((heightNavLink+23)*i)+4}px;
        display: block;
      }
    `
  }
  return css`${styles}`;
}

const WrapperBox = styled(Box)`
  @media screen and (min-width: 901px) {
    position: sticky;
    top: 10px;
  }
`;

const BoxLogo = styled(Box)`
  text-align: center;
  padding: 10px 0;
`;

const MenuItems = styled(Box)`
  color: #fff;
  display: flex;
  align-items: center;
  gap: 20px;
`

const BoxNavMenu = styled.nav`
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  a {
    padding: 20px 10px 10px 30px;
    // text-align: center;
    position: relative;
    z-index: 2;
    display: block;
    text-decoration: none;
    // font-size: 18px;
    font-weight: 700;
    svg {
      opacity: 0.8;
      width: 35px;
      fill: #fff;
    }
    &:hover svg,
    &.active svg {
      opacity: 1;
    }
  }
  .animation-wrap {
    position: absolute;
    display: none;
    // left: ${((250 - heightAnimation) / 2)}px;
    @media screen and (max-width: 900px) {
      left: 17px;
    }
    width: 250px;
    height: ${heightAnimation+20}px;
    background: linear-gradient(to right, red, purple);
    z-index: 1;
    transition: all .5s ease;
    border-radius: 5px;
  }
  ${createCSSAnimation()};
`;

export default SidebarLeft;