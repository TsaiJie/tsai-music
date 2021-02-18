// 扩大可点击区域
const extendClick = () => {
  return `
    position: relative;
    &:before{
      content: '';
      position: absolute;
      top: -10px; bottom: -10px; left: -10px; right: -10px;
    };
  `;
};
// 单行文字溢出部分用 ... 代替
const noWrap = () => {
  return `
    text-overflow: ellipsis;
    overflow: hidden; 
    white-space: nowrap;
  `;
};
const globalStyle = {
  'color-background': '#222',
  'color-background-d': 'rgba(0, 0, 0, 0.3)',
  'color-highlight-background': '#333',
  'color-dialog-background': '#666',
  'color-theme': '#ffcd32',
  'color-theme-d': 'rgba(255, 205, 49, 0.5)',
  'color-sub-theme': '#d93f30',
  'color-text': '#fff',
  'color-text-d': 'rgba(255, 255, 255, 0.3)',
  'color-text-l': 'rgba(255, 255, 255, 0.5)',
  'color-text-ll': 'rgba(255, 255, 255, 0.8)',
  'font-size-small-s': '10px',
  'font-size-small': '12px',
  'font-size-medium': '14px',
  'font-size-medium-x': '16px',
  'font-size-large': '18px',
  'border-color': '#e4e4e4',

  'background-color-shadow': 'rgba(0, 0, 0, 0.3)',
  'highlight-background-color': '#fff',
  extendClick,
  noWrap,
};
export default globalStyle;
