import axiosClient from "./axiosClient";

class AuthApi {
  getInfo = () => {
    const url = '/user/me';
    return axiosClient.get(url);
  };
  login = (params) => {
    const url = '/auth/sign-in';
    return axiosClient.post(url, params);
  };
  signup = (params) => {
    const url = '/auth/sign-up';
    return axiosClient.post(url, params);
  };
  verifyEmail = (params) => {
    const url = '/auth/verify-email';
    return axiosClient.post(url, params);
  };
  forgotPassword = (params) => {
    const url = '/auth/forgot-password';
    return axiosClient.post(url, params);
  };
  resetPassword = (params) => {
    const url = '/auth/reset-password';
    return axiosClient.post(url, params);
  };
}

const authApi = new AuthApi();
export default authApi;