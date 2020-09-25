import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html,
  body {
    padding: 0;
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.base};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.fonts.color};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
    margin-top: 0;
    color: ${({ theme }) => theme.fonts.color};
  }
  
  p {
    margin: 0;
    color: ${({ theme }) => theme.fonts.color};
  }

  * {
    box-sizing: border-box;
  }

  textarea,
  input {
    font-family: ${({ theme }) => theme.fonts.base};
  }
`;

export default GlobalStyle;
