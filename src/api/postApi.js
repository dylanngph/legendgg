import axiosClient from "./axiosClient";

class PostApi {
  getPopular = (page, limit) => {
    const url = '/article/all';
    const params = {
      page: page,
      limit: limit,
      sortBy: '-nViews'
    };
    return axiosClient.get(url, params);
  };
  getNew = (page, limit) => {
    const url = '/article/all';
    const params = {
      page: page,
      limit: limit,
      sortBy: '-createdAt'
    };
    return axiosClient.get(url, { params });
  };
  getAll = (params) => {
    const url = '/article/all';
    return axiosClient.get(url, { params });
  };
  getDetail = (params) => {
    const url = '/article';
    return axiosClient.get(url, { params });
  };
  getRelated = (params) => {
    const url = '/article/related';
    return axiosClient.get(url, { params });
  };
}

const postApi = new PostApi();
export default postApi;