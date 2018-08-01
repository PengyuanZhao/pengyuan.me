import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 16px;
  border-bottom: 1px solid #e5e9f2;
  h1 {
    margin: 0;
    font-size: 28px;
  }
`;

const Header = () => (
  <Wrapper>
    <h1>Pengyuan Zhao</h1>
  </Wrapper>
);

export default Header;
