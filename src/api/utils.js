export const getCount = (count) => {
  if (count < 0) return;
  if (count < 10000) {
    return count;
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + '万';
  } else {
    return Math.floor(count / 10000000) / 10 + '亿';
  }
};
// 防抖
export const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
      clearTimeout(timer);
    }, delay);
  };
};
// 处理数据，找出第一个没有歌名的排行榜的索引
export const filterIndex = (rankList) => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1;
    }
  }
};
// 处理歌手列表拼接歌手名字
export const getName = (list) => {
  let str = '';
  list.map((item, index) => {
    str += index === 0 ? item.name : '/' + item.name;
    return item;
  });
  return str;
};
// 判断一个对象是否为空
export const isEmptyObject = (obj) => !obj || Object.keys(obj).length === 0;

// 给 css3 相关属性增加浏览器前缀，处理浏览器兼容性问题
let elementStyle = document.createElement('div').style;

let vendor = (() => {
  // 首先通过 transition 属性判断是何种浏览器
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransfrom',
    ms: 'msTransform',
    standard: 'Transform',
  };
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }
  return false;
})();

export function prefixStyle(style) {
  if (vendor === false) {
    return false;
  }
  if (vendor === 'standard') {
    return style;
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}
const _pad = (num, n = 2) => {
  let len = num.toString().length;
  while (len < n) {
    num = '0' + num;
    len++;
  }
  return num;
};
export const formatTime = (interval) => {
  // 向下取整
  interval = interval | 0;
  const minute = (interval / 60) | 0;
  const second = _pad(interval % 60);
  return `${minute}:${second}`;
};
const getRandomInt = (min, max) => {
  // Math.random() * (max - min + 1) (min, max]
  // Math.random() * (max - min + 1) + min [min, max]
  return Math.floor(Math.random() * (max - min + 1) + min);
};
export const shuffle = (arr) => {
  const new_arr = [];
  arr.forEach((item) => {
    new_arr.push(item);
  });
  for (let i = 0; i < new_arr.length; i++) {
    let j = getRandomInt(0, i);
    let t = new_arr[i];
    new_arr[i] = new_arr[j];
    new_arr[j] = t;
  }
  return new_arr;
};
// 找到当前的歌曲索引
export const findIndex = (song, list) => {
  if (!song) return;
  return list.findIndex((item) => {
    return song.id === item.id;
  });
};
