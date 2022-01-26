import axiosClient from "./axiosClient";

class CategoryApi {
  getAll = (params) => {
    const url = '/category/all';
    return axiosClient.get(url, { params });
  };
}

const categoryApi = new CategoryApi();
export default categoryApi;