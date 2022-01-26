import axiosClient from "./axiosClient";

class PostApi {
  getAll = (params) => {
    const url = '/article/all';
    return axiosClient.get(url, { params });
  };
  getDetail = (params) => {
    const url = '/article';
    return axiosClient.get(url, { params });
  };
}

const postApi = new PostApi();
export default postApi;