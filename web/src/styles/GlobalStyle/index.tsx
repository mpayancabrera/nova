import { createGlobalStyle } from "styled-components";
import { theme } from "../Theme";


const GlobalStyle = createGlobalStyle`
html,
  body {
    padding: 0;
    margin: 0;
    font-family: ${theme.fonts.base};
  }

  * {
    box-sizing: border-box;
  }

  textarea,
  input {
    font-family: ${theme.fonts.base};
  }
`;

export default GlobalStyle;