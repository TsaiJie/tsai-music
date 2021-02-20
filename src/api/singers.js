import { axiosInstance } from './config';
// 获取热门歌手数据
export const getHotSingerListRequest = (count) => {
  console.log(`/top/artists?offset=${count}`);
  return axiosInstance.get(`/top/artists?offset=${count}`);
};
// 获取类别歌手数据
export const getCategorySingerListRequest = (category, alpha, count) => {
  const type = category ? category.type : '';
  const area = category ? category.area : '';
  const lowAlpha = alpha ? alpha.name.toLowerCase() : '';
  return axiosInstance.get(
    `/artist/list?type=${type}&area=${area}&initial=${lowAlpha}&offset=${count}`
  );
};
