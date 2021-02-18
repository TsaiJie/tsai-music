import { createGlobalStyle } from 'styled-components';
import style from './global-style';
const BaseStyle = createGlobalStyle`
  body, html {
    line-height: 1;
    font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif, 'Droid Sans Fallback';
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    background: ${style['color-background']};
    color: ${style['color-text']};
  }
`;
export default BaseStyle;
