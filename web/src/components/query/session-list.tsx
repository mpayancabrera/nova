import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { Col, Row, List, Button } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ConnectionInfo } from "../connection/connection-info";

const sessionPrefix = "session-";

export const SessionList = () => {
  const history = useHistory();
  const [sessions, setSessions] = useState<any[]>([]);

  const getSessions = useCallback(() => {
    const sessions = Object.keys(localStorage)
      .filter((k) => k.indexOf(sessionPrefix) > -1)
      .map((sessionId) => ({
        sessionId: sessionId.substr(sessionPrefix.length),
        ...JSON.parse(localStorage.getItem(sessionId)!),
      }));
    setSessions(sessions);
  }, []);

  useEffect(() => {
    getSessions();
  }, [getSessions]);

  const openSession = (sessionId: string) => {
    history.push(`/query?session=${sessionId}`);
  };

  const deleteSession = (sessionId: string) => {
    localStorage.removeItem(`${sessionPrefix}${sessionId}`);
    getSessions();
  };

  if (sessions.length === 0) {
    return (
      <p>
        No sessions saved. To start a new session go to{" "}
        <Link to="/connections">connections</Link> and click{" "}
        <i>
          " <SearchOutlined /> Open query session "
        </i>
        .
      </p>
    );
  } else {
    return (
      <Row>
        <Col>
          <p>Open a saved session: </p>
          <List
            itemLayout="horizontal"
            dataSource={sessions}
            renderItem={(s) => (
              <List.Item>
                <ConnectionInfo connection={s.connection} />
                <Row>
                  <Button
                    icon={<SearchOutlined />}
                    onClick={() => openSession(s.sessionId)}
                  />
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => deleteSession(s.sessionId)}
                  />
                </Row>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    );
  }
};
