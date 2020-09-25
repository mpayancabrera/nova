export const lightTheme = {
  colors: {
    primary: "#001529",
    secondary: "#1890ff",
    black: "#000",
    grey: "#444",
    white: "#fff",
    background: "#f0f2f5",
  },
  fonts: {
    base:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif',
    color: "#000",
  },
  breakpoints: {
    mobile: "520px",
    tablet: "768px",
  },
};

export const blackTheme = {
  colors: {
    primary: "#001529",
    secondary: "#1890ff",
    black: "#000",
    grey: "#444",
    white: "#fff",
    background: "#001429",
  },
  fonts: {
    base:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif',
    color: "#fff",
  },
  breakpoints: {
    mobile: "520px",
    tablet: "768px",
  },
};

export type Theme = typeof lightTheme;
