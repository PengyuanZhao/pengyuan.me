import { injectGlobal } from 'styled-components';

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system,PingFang SC,Hiragino Sans GB,Microsoft YaHei,
      Helvetica Neue,Arial,sans-serif;;
    color: #333;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  a {
    color: #333;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  time {
    font-size: 14px;
    color: #999;
  }
`;
