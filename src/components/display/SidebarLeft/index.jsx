import React from 'react';
import { navBar } from '../../../constants/data/navbar';
import { NavLink } from 'react-router-dom';
import { Box } from '@mui/material';
import styled, { css } from 'styled-components';

const activeClassName = "active";
const heightNavLink = 59;
const heightAnimation = 48;

function SidebarLeft() {
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
            <item.icon fontSize="large" sx={{ color: '#ffffff' }}/>
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
        top: ${(heightNavLink*i)+4}px;
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

const BoxNavMenu = styled.nav`
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
  a {
    padding: 10px 15px;
    text-align: center;
    position: relative;
    z-index: 2;
    display: block;
    svg {
      opacity: 0.8;
    }
    &:hover svg,
    &.active svg {
      opacity: 1;
    }
  }
  .animation-wrap {
    position: absolute;
    display: none;
    left: ${((120 - heightAnimation) / 2)}px;
    @media screen and (max-width: 900px) {
      left: 17px;
    }
    width: ${heightAnimation}px;
    height: ${heightAnimation}px;
    background: linear-gradient(to right, red, purple);
    z-index: 1;
    transition: all .5s ease;
    border-radius: 5px;
  }
  ${createCSSAnimation()};
`;

export default SidebarLeft;