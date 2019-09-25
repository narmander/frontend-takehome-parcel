import styled, { css, createGlobalStyle } from 'styled-components';

// resetting browser default styles
export const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
  }

  h1,h2,h3,h4,h5,h6,p,ul,li {
    margin: 0;
    padding: 0;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }
`;

// wrapper for keeping all elements in the same box-model styles
const wrapper = css`
  padding: 16px;
  max-width: 1200px;
  border: 1px solid red;
  margin: 0 auto;
`;

export const Wrapper = styled.div`
  ${wrapper}
`;

