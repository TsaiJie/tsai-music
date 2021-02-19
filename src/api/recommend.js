import { axiosInstance } from './config';
// 获取banner
export const getBannerRequest = () => {
  return axiosInstance.get('/banner');
};
// 获取推荐数据
export const getRecommendListRequest = () => {
  return axiosInstance.get('/personalized');
};
