import { axiosInstance } from './config';
export const getLyricRequest = (id) => {
  return axiosInstance.get(`/lyric?id=${id}`);
};
