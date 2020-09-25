import React, { useRef, useState } from "react";
import { Switch as SwitchComponent, Button, Layout, Row } from "antd";
import { Switch, Route, Router, Link, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import styled from "styled-components";

import { ConnectionsView, QueryView } from "./views";
import { LinkOutlined, SearchOutlined } from "@ant-design/icons";

import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import { lightTheme, blackTheme } from "../src/styles/Theme";

const { Header, Content, Footer } = Layout;

const Logo = styled.h1`
  color: white;
  letter-spacing: 0.2rem;
  margin-right: 24px;

  span {
    letter-spacing: 0;
    color: #f7c600;
    font-size: 0.75rem;
  }
`;

const MenuLink = styled(Link)`
  color: white;
  margin-right: 8px;
`;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

const StyledContent = styled(Content)`
  padding: 8px;
  margin: 16px auto;
  width: 80%;
`;

const StyledSwitch = styled(SwitchComponent)`
  margin-top: 20px;
`;

const StyledFooter = styled(Footer)`
  background: ${({ theme }) => theme.colors.background};
`;

function App() {
  const history = useRef(createBrowserHistory());
  const [theme, setTheme] = useState("light");

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : blackTheme}>
      <GlobalStyle />
      <Router history={history.current}>
        <StyledLayout>
          <Header>
            <Row>
              <Logo>
                NOVA<span>beta</span>
              </Logo>
              <MenuLink to="/connections">
                <span>
                  <LinkOutlined />
                </span>
                <span>Connections</span>
              </MenuLink>
              <MenuLink to="/query">
                <span>
                  <SearchOutlined />
                </span>
                <span>Query</span>
              </MenuLink>

              <StyledSwitch
                checkedChildren="Disable Dark mode"
                unCheckedChildren="Enable Dark mode"
                onClick={themeToggler}
              />
            </Row>
          </Header>
          <StyledContent>
            <Switch>
              <Redirect exact from="/" to="/connections" />
              <Route exact path="/connections">
                <ConnectionsView />
              </Route>
              <Route
                exact
                path="/query"
                render={(route) => <QueryView route={route} />}
              />
            </Switch>
          </StyledContent>
          <StyledFooter>
            <Row justify="center">
              <p>Nova by pirobits (c) 2020</p>
            </Row>
          </StyledFooter>
        </StyledLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
