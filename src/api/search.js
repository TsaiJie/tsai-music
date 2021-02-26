import { axiosInstance } from './config';
export const getHotKeyWordsRequest = () => {
  return axiosInstance.get(`/search/hot`);
};

export const getSuggestListRequest = (query) => {
  return axiosInstance.get(`/search/suggest?keywords=${query}`);
};

export const getResultSongsListRequest = (query) => {
  return axiosInstance.get(`/search?keywords=${query}`);
};
