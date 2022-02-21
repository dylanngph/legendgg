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
  getRelated = (params) => {
    const url = '/article/related';
    return axiosClient.get(url, { params });
  };
  postnView = (articleId) => {
    const url = '/article/view';
    return axiosClient.post(url, { articleId: articleId });
  }
}

const postApi = new PostApi();
export default postApi;