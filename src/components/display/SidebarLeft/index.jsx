import React from 'react';
import { navBar } from '../../../constants/data/navbar';
import { NavLink } from 'react-router-dom';
import { Box } from '@mui/material';
import styled, { css } from 'styled-components';

const activeClassName = "active";
const heightNavLink = 48;

function SidebarLeft() {
  return (
    <WrapperBox>
      <BoxLogo>
        <NavLink to="/">
          <img src="/images/logo.svg" alt="logo" />
        </NavLink>
      </BoxLogo>
      <BoxNavMenu>
        {navBar.map((item) => (
          <NavLink key={item.title} to={item.href} className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }>
            <item.icon sx={{ color: '#ffffff' }}/>
          </NavLink>
        ))}
        <div className='animation-wrap'><div className='amimation-module'></div></div>
      </BoxNavMenu>
    </WrapperBox>
  )
}

function createCSSAnimation() {
  let styles = '';
  for (let i = 0; i < navBar.length; i += 1) {
    styles += `
      a:nth-child(${i+1}).active ~ .animation-wrap,
      a:nth-child(${i+1}):not(.actice):hover ~ .animation-wrap {
        top: ${(heightNavLink*i)+6}px;
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
    &:hover svg,
    &.active svg {
      color: #C33020;
      z-index: 2;
    }
  }
  .animation-wrap {
    position: absolute;
    display: none;
    left: 23px;
    width: 32px;
    height: 32px;
    background: linear-gradient(to right, red, purple);
    z-index: 1;
    transition: all .5s ease;
    padding: 1px;
    border-radius: 5px;
  }
  .amimation-module {
    padding: 16px;
    background: #080811;
    border-radius: 5px;
  }
  ${createCSSAnimation()};
`;

export default SidebarLeft;