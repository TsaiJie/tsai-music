import { axiosInstance } from './config';
export const getSingerInfoRequest = (id) => {
  return axiosInstance.get(`/artists?id=${id}`);
};
