import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e5e9f2;
  h1 {
    margin: 0;
    font-size: 28px;
  }
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  a {
    display: inline-flex;
    transition: opacity 0.25s;
    + a {
      margin-left: 12px;
    }
    &:hover {
      opacity: 0.75;
    }
  }
`;

const Header = () => (
  <Wrapper>
    <h1>Pengyuan Zhao</h1>
    <Links>
      <a href="https://juejin.im/user/576caa55d342d30057b59af6" target="_blank">
        <img src={require('../assets/images/icon-juejin.svg')} alt="juejin" />
      </a>
      <a href="https://github.com/PengyuanZhao" target="_blank">
        <FaGithub color="" size="1.75em" />
      </a>
      <a href="linkedin.com/in/pengyuan-zhao-b6357572" target="_blank">
        <FaLinkedin color="#0077b5" size="1.75em" />
      </a>
    </Links>
  </Wrapper>
);

export default Header;
