import axiosClient from "./axiosClient";
class PartnerApi {
  getAll = () => {
    const url = '/partner/all';
    return axiosClient.get(url);
  };
}

const partnerApi = new PartnerApi();
export default partnerApi;