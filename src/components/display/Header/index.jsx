import { NavLink } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { navBar } from 'constants/data/navbar';
import { cateList } from 'constants/data/category';
import { ReactComponent as UserIcon } from 'icons/user.svg';
import { ReactComponent as SearchIcon } from 'icons/search.svg';
import styled from 'styled-components';


const activeClassName = "active";

function Header() {
  return (
    <WrapperHeader>
      <BoxHeader>
        <BoxLeft>
          <BoxLogo sx={{width: {md : '180px', xs: '60px'} }}>
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
                  <BoxSubMenu>
                    <div>
                      <Box sx={{ marginBottom: '10px', color: '#888888'}} >CATEGORIES</Box>
                      <Grid container spacing={2} sx={{ paddingRight: '41px' }}>
                      {cateList.map((cate) => (
                        <Grid item xs={6} md={3} key={cate.id}>
                          <NavLink to={`/cate/${cate.href}`}>
                            <BoxCate>
                              <img src={`images/img-cate-${cate.id}.jpg`} alt={cate.title} />
                            <span>{cate.title}</span>
                            </BoxCate>
                          </NavLink>
                        </Grid>
                      ))}
                      </Grid>
                    </div>
                  </BoxSubMenu>
                )}
              </span>
            ))}
          </BoxNavMenu>
        </BoxLeft>
        <BoxRight>
          <BoxIcon>
            <UserIcon />
          </BoxIcon>
          <BoxIcon>
            <SearchIcon />
          </BoxIcon>
          <ButtonLink href="#to-dapp">D-app</ButtonLink>
        </BoxRight>
      </BoxHeader>
    </WrapperHeader>
  )
}

const ButtonLink = styled.a`
  display: block;
  padding: 10px 15px;
  border-radius: 5px;
  background-color: #111111;
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  font-size: 12px;
  @media screen and (max-width: 600px) {
    padding: 6px 4px;
  }
`;

const BoxIcon = styled.div`
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  @media screen and (max-width: 600px) {
    margin-right: 8px;
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const BoxCate = styled.div`
  position: relative;
  transition: all 0.3s;
  overflow: hidden;
  height: 150px;
  img {
    position: relative;
    width: 100%;
    height: 150px;
    object-fit: cover;
    object-position: center;
    transition: all 1.5s;
  }
  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    color: #ffffff;
    z-index: 3;
  }
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 150px;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 2;
  }
  &:hover img {
    transform: scale(1.2);
  }
  &:hover:after {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const BoxSubMenu = styled.div`
  visibility: hidden;
  opacity: 0;
  display: none;
  background-color: #ffffff;
  position: fixed;
  width: 100%;
  min-height: 100px;
  left: 0;
  top: 55px;
  transition: all 0.5s;
  padding: 15px 25px 10px;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
`;

const BoxNavMenu = styled.nav`
  display: flex;
  margin-left: 10px;
  justify-content: center;
  align-items: center;
  .nav-item {
    height: 100%;
    padding: 10px 20px;
    @media screen and (max-width: 600px) {
      padding: 10px 5px;
    }
    > a {
      color: #111111;
      text-transform: uppercase;
      font-size: 12px;
      letter-spacing: .5px;
      font-weight: 500;
      text-decoration: none;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
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
  }
  
`;

const BoxLogo = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
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

const BoxRight = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoxLeft = styled(Box)`
  display: flex;
`;

const BoxHeader = styled.div` 
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WrapperHeader = styled.div`
  border-bottom: 1px solid #eeeeee;
  padding: 0 25px;
  position: sticky;
  top: 0;
  background-color: #ffffff;
  z-index: 9999;
  & + div {
    position: relative;
    z-index: 1;
  }
`;

export default Header;