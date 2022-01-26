import React, { useState, useEffect } from 'react';
import { navBar } from '../../../constants/data/navbar';
import { NavLink } from 'react-router-dom';
import { Box } from '@mui/material';
import styled from 'styled-components';

const activeClassName = "active";

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
          <ItemNavMenu key={item.title}>
            <NavLink to={item.href} className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }>
              <item.icon sx={{ color: '#ffffff' }}/>
            </NavLink>
          </ItemNavMenu>
        ))}
      </BoxNavMenu>
    </WrapperBox>
  )
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

const BoxNavMenu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
`;

const ItemNavMenu = styled.li`
  padding: 10px 15px;
  text-align: center;
  a:hover svg,
  a.active svg {
    color: #C33020;
  }
`;

export default SidebarLeft;