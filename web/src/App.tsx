import React, { useRef } from "react";
import { Layout, Row } from "antd";
import { Switch, Route, Router, Link, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import styled from "styled-components";

import { ConnectionsView, QueryView } from "./views";
import { LinkOutlined, SearchOutlined } from "@ant-design/icons";

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
`;

const StyledContent = styled(Content)`
  padding: 8px;
  margin: 16px auto;
  width: 80%;
`;

function App() {
  const history = useRef(createBrowserHistory());

  return (
    <Router history={history.current}>
      <StyledLayout>
        <Header>
          <Row>
            <Logo>
              NOVA<span>beta</span>
            </Logo>
            <MenuLink to="/connections">
              <Row>
                <span>
                  <LinkOutlined />
                </span>
                <span>Connections</span>
              </Row>
            </MenuLink>
            <MenuLink to="/query">
              <Row>
                <span>
                  <SearchOutlined />
                </span>
                <span>Query</span>
              </Row>
            </MenuLink>
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
        <Footer>
          <Row justify="center">
            <p>Nova by pirobits (c) 2020</p>
          </Row>
        </Footer>
      </StyledLayout>
    </Router>
  );
}

export default App;
