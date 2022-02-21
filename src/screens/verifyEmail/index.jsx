import React, { useState, useEffect, useMemo } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import ContainerAuth from 'components/display/ContainerAuth';
import authApi from 'api/authApi';
import NotFound from 'components/display/NotFound';
import useToken from 'utils/hooks/useToken';
import styled from 'styled-components';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), search);
}

function VerifyEmailScreen() {
  let query = useQuery();
  const navigate = useNavigate();
  const { token, setToken } = useToken();
  const [error, setError] = useState(false);
  const [successVerify, setSuccessVerify] = useState(false);

  if (!query.get('token')) {
    navigate('/');
  }

  useEffect(() => {
    setError(false);

    const verifyEmail = async () => {
      try {
        const params = {
          token: query.get('token'),
        };
        const response = await authApi.verifyEmail(params);
        if(response.message) {
          // setToken(query.get('token'));
          // navigate('/');
          setSuccessVerify(true);
        }
      } catch (error) { setError(true); }
    }

    verifyEmail();
  }, []);
  
  return (
    <>
      {query.get('token') ? (
        <ContainerAuth>
          <WrapperEmailVerify>
            {!error ? (
              <>
              {!successVerify ? (
                <>
                  <div>đang xác thực email</div>
                  <CircularProgress />
                </>
              ) : (
                <>
                  <div>Xác thực email thành công</div>
                  <NavLink to="/login">Đăng nhập ngay</NavLink>
                </>
              )}
              </>
            ) : (
              <>
                <div>xác thực email thất bại</div>
                <div>vui lòng kiểm tra lại hoặc liên hệ admin</div>
                <NavLink to="/">Trở về trang chủ</NavLink>
              </>
            )}
          </WrapperEmailVerify>
        </ContainerAuth>
      ) : (
        <NotFound />
      )}
    </>
  )
}

const WrapperEmailVerify = styled.div`
  color: #111111;
  text-transform: uppercase;
  font-size: 12px;
`;

export default VerifyEmailScreen;