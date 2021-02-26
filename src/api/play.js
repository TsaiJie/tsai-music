import { axiosInstance } from './config';
export const getSongDetailRequest = (id) => {
  return axiosInstance.get(`/song/detail?ids=${id}`);
};
