import axiosClient from "./axiosClient";

class ContactApi {
  postForm = (params) => {
    const url = '/contact-form';
    return axiosClient.post(url, params);
  };
}

const contactApi = new ContactApi();
export default contactApi;