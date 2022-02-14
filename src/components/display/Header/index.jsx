import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { navBar } from 'constants/data/navbar';
import Burger from './burger';
import Menu from './menu';
import { ReactComponent as UserIcon } from 'icons/user.svg';
import { ReactComponent as SearchIcon } from 'icons/search.svg';
import { navBarUser_normal, navBarUser_ed } from 'constants/data/user';
import { useSelector, useDispatch } from 'react-redux';
import { changeStateNavUserMenu } from 'redux/layout/layout.action';
import useToken from 'utils/hooks/useToken';
import categoryApi from 'api/categoryApi';
import styled from 'styled-components';

const activeClassName = "active";

function Header() {
  const dispatch = useDispatch();
  const stateNavUserMenu = useSelector((state) => state.layoutReducer.layoutStore.stateNavUserMenu);
  const { token, setToken } = useToken();
  const [cateList, setCateList] = useState([]);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await categoryApi.getAll();
        setCateList(response.data);
      } catch (error) { }
    }
    fetchList();
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location])

  const handleLogout = () => {
    setToken(null);
    dispatch(changeStateNavUserMenu());
  }

  const renderMenuUser = () => {
    if (!stateNavUserMenu) {
      return navBarUser_normal.map((item, index) => <NavLink key={index} to={item.href}>{item.title}</NavLink>)
    } else {
      return (
        <div>
          <NavLink to={navBarUser_ed[0].href}>{navBarUser_ed[0].title}</NavLink>
          <span onClick={handleLogout}>{navBarUser_ed[1].title}</span>
        </div>
      )
    }
  }

  return (
    <WrapperHeader>
      <BoxHeader>
        <BoxLeft>
          <Box sx={{display: {xs: 'block', md: 'none'}, marginRight: '10px'}}>
            <Burger open={open} setOpen={setOpen} />
          </Box>
          <BoxLogo sx={{width: { xs: '100px', md: '180px'} }}>
            <NavLink to="/">
              <img src="/LegendGuildLogo.png" alt="LegendGuildLogo" />
            </NavLink>
          </BoxLogo>
          <Box sx={{height: '100%', display: {xs: 'none', md: 'block'}}}>
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
                    <div>
                      <Box sx={{ marginBottom: '10px', color: '#888888'}} >CATEGORIES</Box>
                      <Grid container spacing={2} sx={{ paddingRight: '41px' }}>
                      {cateList.map((cate, index) => (
                        <Grid item xs={6} md={3} key={index}>
                          <NavLink to={`/cate/${cate.slug}`}>
                            <BoxCate>
                              <img src={`/images/img-cate-${Math.floor(Math.random() * 7)}.jpg`} alt={cate.name} />
                              <span>{cate.name}</span>
                            </BoxCate>
                          </NavLink>
                        </Grid>
                      ))}
                      </Grid>
                    </div>
                  </BoxSubMenu>
                  )}
                  </>
                )}
              </span>
            ))}
          </BoxNavMenu>
          </Box>
        </BoxLeft>
        <BoxRight>
          <BoxIcon sx={{position: 'relative', '&:hover': {
            '&>div': { visibility: 'visible', opacity: 1, 'display': 'block'}
          }}}>
            <UserIcon />
            <BoxMenuUser>
              {renderMenuUser()}
            </BoxMenuUser>
          </BoxIcon>
          <BoxIcon>
            <NavLink to={`/search`}>
              <SearchIcon />
            </NavLink>
          </BoxIcon>
          <ButtonLink href="/digital-assets">Digital Assets</ButtonLink>
        </BoxRight>
      </BoxHeader>
      <Menu open={open} cateList={cateList}/>
    </WrapperHeader>
  )
}

const BoxMenuUser = styled.div`
  visibility: hidden;
  opacity: 0;
  display: none;
  background-color: #ffffff;
  position: absolute;
  width: 150px;
  top: 60px;
  transition: all 0.5s;
  padding: 15px 25px 10px;
  border: 1px solid #eeeeee;
  a, span {
    color: #111111;
    font-size: 12px;
    letter-spacing: .5px;
    line-height: 30px;
    font-weight: 500;
    display: block;
    text-align: center;
    text-decoration: underline;
    cursor: pointer;
  }
`;

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

const BoxIcon = styled(Box)`
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
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
    text-align: center;
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
  @media screen and (max-width: 600px) {
    span {
      font-size: 16px;
    }
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
  top: 60px;
  transition: all 0.5s;
  padding: 15px 25px 10px;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
`;

const BoxNavMenu = styled.nav`
  display: flex;
  margin-left: 30px;
  justify-content: center;
  align-items: center;
  height: 100%;
  .nav-item {
    height: 100%;
    padding: 0 20px;
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
  @media screen and (max-width: 600px) {
    margin-left: 10px;
    .nav-item {
      padding: 10px 5px;
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
  height: 100%;
`;

const BoxLeft = styled(Box)`
  display: flex;
  height: 100%;
`;

const BoxHeader = styled.div` 
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  height: 60px;
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