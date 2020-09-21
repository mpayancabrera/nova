import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, notification, Row, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { Editor, Results, EditorHeader } from "../components";
import { IConnection } from "../interfaces/connection.interface";
import { ReconnectModal } from "../components/connection/reconnect.modal";
import { RouteChildrenProps } from "react-router-dom";
import { ConnectionService } from "../services/connect.service";
import { SessionList } from "../components/query/session-list";

interface QueryState {
  query: string;
  results: any[];
  connection: IConnection;
  loading: boolean;
  connectModal: boolean;
}

const SESSION_KEY = "session";

const DEFAULT_STATE: QueryState = {
  query: "",
  results: [],
  connection: {
    id: "",
    database: "",
    host: "",
    port: 0,
    user: "",
    status: false,
  },
  loading: false,
  connectModal: false,
};

const Actions = styled(Row)`
  padding: 8px;
`;

const searchParam = "?session=";

export const QueryView: React.FC<{ route: RouteChildrenProps<any> }> = ({
  route,
}) => {
  const history = route.history;
  const [state, setState] = useState<QueryState>(DEFAULT_STATE);

  const sessionId =
    route.location.search.indexOf(searchParam) > -1
      ? route.location.search.substr(searchParam.length)
      : undefined;

  const getSessionKey = (sessionId: string) => {
    return `${SESSION_KEY}-${sessionId}`;
  };

  useEffect(() => {
    const checkConnectionStatus = async (connectionId: string) => {
      const res = await ConnectionService.check(connectionId);

      if (res.ok) {
        const { status: connectionStatus } = await res.json();
        setState((prevState) => ({
          ...prevState,
          connection: { ...prevState.connection, status: connectionStatus },
        }));
      }
    };

    if (sessionId) {
      const storedSession = localStorage.getItem(getSessionKey(sessionId));

      if (storedSession) {
        const session = JSON.parse(storedSession);
        setState((prevState) => ({
          ...prevState,
          ...session,
          session: sessionId,
        }));

        checkConnectionStatus(session.connection.id);
      } else if (history.location.state) {
        const connection = (history.location.state as any).connection;
        setState((prevState) => ({
          ...prevState,
          connection: (history.location.state as any).connection,
          session: sessionId,
        }));
        checkConnectionStatus(connection.id);
      }
    }
  }, [sessionId, history.location.state]);

  const onQuery = useCallback(async () => {
    setState((prevState) => ({ ...prevState, loading: true }));

    const res = await fetch(`/api/v1/connection/${state.connection.id}/query`, {
      method: "POST",
      body: JSON.stringify({
        query: state.query,
        connection: state.connection.id,
      }),
      headers: { "Content-Type": "application/json" },
    });

    setState((prevState) => ({ ...prevState, loading: false }));
    const { data, error } = await res.json();

    if (res.ok) {
      setState((prevState) => ({ ...prevState, results: data }));
    } else {
      notification.error({
        message: "Query error",
        description: error,
      });
    }
  }, [state.connection.id, state.query]);

  const onCtrlEnter = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Enter" && e.ctrlKey) {
        onQuery();
      }
    },
    [onQuery]
  );

  useEffect(() => {
    if (state.connection.id && sessionId) {
      localStorage.setItem(
        getSessionKey(sessionId),
        JSON.stringify({ query: state.query, connection: state.connection })
      );
    }

    document.addEventListener("keydown", onCtrlEnter);

    return () => {
      document.removeEventListener("keydown", onCtrlEnter);
    };
  }, [state.query, state.connection, sessionId, onCtrlEnter]);

  if (sessionId === undefined) {
    return <SessionList />;
  }

  return (
    <Row>
      <Col span={24}>
        <Row justify="start">
          <EditorHeader
            connection={state.connection}
            onDisconnect={() => {
              localStorage.removeItem(getSessionKey(sessionId));
              setState(DEFAULT_STATE);
              history.push("/");
            }}
            onConnect={() => {
              setState((prevState) => ({ ...prevState, connectModal: true }));
            }}
          />
        </Row>
        <Row>
          <Editor
            value={state.query}
            onChange={(query) =>
              setState((prevState) => ({ ...prevState, query }))
            }
          />
        </Row>
        <Actions justify="end">
          <Button
            size="large"
            type="primary"
            icon={<SearchOutlined />}
            onClick={onQuery}
            disabled={state.loading || !state.connection.status}
          >
            Query
          </Button>
        </Actions>
        <Row justify="center">
          {state.loading ? <Spin /> : <Results data={state.results} />}
        </Row>
      </Col>

      <ReconnectModal
        visible={state.connectModal}
        connection={state.connection}
        onConnect={(connectionId) =>
          setState((prevState) => ({
            ...prevState,
            connection: {
              ...prevState.connection,
              id: connectionId,
              status: true,
            },
            connectModal: false,
          }))
        }
        onCancel={() =>
          setState((prevState) => ({ ...prevState, connectModal: false }))
        }
      />
    </Row>
  );
};
