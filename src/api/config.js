import axios from 'axios';
export const baseUrl = 'http://1.15.227.196:3000';
//axios 的实例及拦截器配置
export const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    alert(err, '网络错误');
  }
);

// mockData
// 歌手种类
export const categoryTypes = [
  {
    name: '华语男',
    key: '1001',
    type: '1',
    area: '7',
  },
  {
    name: '华语女',
    key: '1002',
    type: '2',
    area: '7',
  },
  {
    name: '华语乐队',
    key: '1003',
    type: '3',
    area: '7',
  },
  {
    name: '欧美男',
    key: '2001',
    type: '1',
    area: '96',
  },
  {
    name: '欧美女',
    key: '2002',
    type: '2',
    area: '96',
  },
  {
    name: '欧美乐队',
    key: '2003',
    type: '3',
    area: '96',
  },
  {
    name: '日本男',
    key: '6001',
    type: '1',
    area: '8',
  },
  {
    name: '日本女',
    key: '6002',
    type: '2',
    area: '8',
  },
  {
    name: '日本乐队',
    key: '6003',
    type: '3',
    area: '8',
  },
  {
    name: '韩国男',
    key: '7001',
    type: '1',
    area: '16',
  },
  {
    name: '韩国女',
    key: '7002',
    type: '2',
    area: '16',
  },
  {
    name: '韩国组合',
    key: '7003',
    type: '3',
    area: '16',
  },
  {
    name: '其他男歌手',
    key: '4001',
    type: '1',
    area: '0',
  },
  {
    name: '其他女歌手',
    key: '4002',
    type: '2',
    area: '0',
  },
  {
    name: '其他乐队',
    key: '4003',
    type: '3',
    area: '0',
  },
];
// 歌手首字母
export const alphaTypes = [
  {
    key: 'A',
    name: 'A',
  },
  {
    key: 'B',
    name: 'B',
  },
  {
    key: 'C',
    name: 'C',
  },
  {
    key: 'D',
    name: 'D',
  },
  {
    key: 'E',
    name: 'E',
  },
  {
    key: 'F',
    name: 'F',
  },
  {
    key: 'G',
    name: 'G',
  },
  {
    key: 'H',
    name: 'H',
  },
  {
    key: 'I',
    name: 'I',
  },
  {
    key: 'J',
    name: 'J',
  },
  {
    key: 'K',
    name: 'K',
  },
  {
    key: 'L',
    name: 'L',
  },
  {
    key: 'M',
    name: 'M',
  },
  {
    key: 'N',
    name: 'N',
  },
  {
    key: 'O',
    name: 'O',
  },
  {
    key: 'P',
    name: 'P',
  },
  {
    key: 'Q',
    name: 'Q',
  },
  {
    key: 'R',
    name: 'R',
  },
  {
    key: 'S',
    name: 'S',
  },
  {
    key: 'T',
    name: 'T',
  },
  {
    key: 'U',
    name: 'U',
  },
  {
    key: 'V',
    name: 'V',
  },
  {
    key: 'W',
    name: 'W',
  },
  {
    key: 'X',
    name: 'X',
  },
  {
    key: 'Y',
    name: 'Y',
  },
  {
    key: 'Z',
    name: 'Z',
  },
];
// 播放模式
export const playMode = {
  sequence: 0,
  loop: 1,
  random: 2,
};
