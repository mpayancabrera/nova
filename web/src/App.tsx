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

function App() {
  const history = useRef(createBrowserHistory());

  return (
    <Router history={history.current}>
      <Layout style={{ minHeight: "100%" }}>
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
        <Content style={{ padding: "8px 8px" }}>
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
        </Content>
        <Footer>
          <Row justify="center">
            <p>Nova by pirobits (c) 2020</p>
          </Row>
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
