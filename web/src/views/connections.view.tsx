import React, { useEffect, useState } from "react";
import { Col, notification, Row, List, Button } from "antd";
import { useHistory } from "react-router-dom";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

import { ConnectionInfo, ConnectModal } from "../components";
import { IConnection } from "../interfaces/connection.interface";
import { ConnectionService } from "../services/connect.service";

interface ConnectionViewState {
  showAddConnection: boolean;
  connections: Array<IConnection>;
}

export const ConnectionsView = () => {
  const history = useHistory();

  const [state, setState] = useState<ConnectionViewState>({
    showAddConnection: false,
    connections: [],
  });

  const openSession = (connection: IConnection) => {
    const session = Math.random().toString(36).substr(2, 9);
    history.push({
      pathname: `/query`,
      state: { connection },
      search: "session=" + session,
    });
  };

  const onCancel = (error?: string) => {
    if (error) {
      notification.error({
        message: "Connection error",
        description: error,
      });
    }

    setState((prevState) => ({ ...prevState, showAddConnection: false }));
  };

  useEffect(() => {
    const getConnections = async () => {
      const res = await ConnectionService.list();

      if (res.ok) {
        const { connections } = await res.json();
        setState((prevState) => ({ ...prevState, connections }));
      }
    };

    getConnections();
  }, []);

  return (
    <Row>
      <Col
        xs={24}
        sm={24}
        md={{ span: 16, offset: 4 }}
        style={{ maxWidth: "800px" }}
      >
        <Row justify="space-between">
          <h1>Open connections</h1>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() =>
              setState((prevState) => ({
                ...prevState,
                showAddConnection: true,
              }))
            }
          >
            New connection
          </Button>
        </Row>
        <List
          itemLayout="horizontal"
          dataSource={state.connections}
          renderItem={(connection) => (
            <List.Item>
              <ConnectionInfo connection={connection} />
              <Row>
                <Button
                  icon={<SearchOutlined />}
                  onClick={() => openSession(connection)}
                >
                  Open query session
                </Button>
              </Row>
            </List.Item>
          )}
        />
      </Col>

      <ConnectModal
        onConnect={(connection) => openSession(connection)}
        onCancel={onCancel}
        visible={state.showAddConnection}
      />
    </Row>
  );
};
