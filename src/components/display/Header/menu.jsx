import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { navBar } from 'constants/data/navbar';
import styled from 'styled-components';

const activeClassName = "active";

function Menu({ open, cateList }) {
  return (
    <StyledMenu open={open}>
      <BoxLogo>
        <NavLink to="/">
          <img src="/LegendGuildLogo.png" alt="LegendGuildLogo" />
        </NavLink>
      </BoxLogo>
      <BoxNavMenu>
        {navBar.map((nav) => (
          <span key={nav.title} className='nav-item'>
            <NavLink  to={nav.href} className={({ isActive }) =>
                (isActive && nav.href !== '#') ? activeClassName : undefined
              }>
              <span>{nav.title}</span>
            </NavLink>
            {nav.title === 'Sections' && (
              <>
              {cateList.length > 0 && (
                <BoxSubMenu>
                  <Grid container spacing={2}>
                  {cateList.map((cate, index) => (
                    <Grid item xs={6} key={index}>
                      <NavLink to={`/cate/${cate.slug}`}>{cate.name}</NavLink>
                    </Grid>
                  ))}
                  </Grid>
              </BoxSubMenu>
              )}
              </>
            )}
          </span>
        ))}
      </BoxNavMenu>
    </StyledMenu>
  );
};

Menu.propTypes = {
  open: PropTypes.bool,
};

export default Menu;

const StyledMenu = styled.nav`
  display: none;
  li {
    padding: 12px 15px;
    display: block;
    > a {
      font-size: 16px;
      line-height: 19px;
      color: #58667E;
      font-weight: bold;
      text-decoration: none;
    }
  }
  @media (max-width: 900px) {
    flex-flow: column wrap;
    background-color: #ffffff;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    display: block;
    list-style: none;
    width: 100%;
    padding-top: 15px;
    transition: transform 0.3s ease-in-out;
    z-index: 10;
  }
`;

const BoxLogo = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  margin: 0 auto;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    max-width: 100%;
    height: auto;
  }
`;

const BoxNavMenu = styled.nav`
  margin-top: 20px;
  padding: 0 25px;
  .nav-item {
    > a {
      padding: 10px 0;
      display: block;
      border-bottom: 1px solid #eeeeee;
    }
  }
  a {
    color: #111111;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: .5px;
    font-weight: 500;
    text-decoration: none;

    &:hover,
    &.active {
      color: #aaaaaa;
    }
  }
  &:hover > div {
    visibility: visible;
    opacity: 1;
    display: block;
  }
`;
const BoxSubMenu = styled.div`
  padding: 25px 0;
`;