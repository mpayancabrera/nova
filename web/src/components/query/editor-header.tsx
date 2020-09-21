import React from "react";
import { Badge, Button, Row } from "antd";
import { IConnection } from "../../interfaces/connection.interface";
import { CaretRightFilled, PauseOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { ConnectionInfo } from "../connection/connection-info";

interface EditorHeaderProps {
  connection: IConnection;
  onDisconnect(): void;
  onConnect(): void;
}

const TextWrapper = styled(Row)`
  background-color: white;
  padding: 8px 16px;
  margin-right: 8px;
`;

const StyledBadge = styled(Badge)`
  margin-right: 8px;

  .ant-badge-status-dot {
    top: 0;
    width: 8px;
    height: 8px;
  }
`;

export const EditorHeader: React.FC<EditorHeaderProps> = ({
  connection,
  onDisconnect,
  onConnect,
}) => {
  return (
    <Row align="middle">
      <TextWrapper>
        <StyledBadge
          size="default"
          status={connection.status ? "success" : "error"}
          style={{ width: "12px", height: "12px" }}
        />
        <ConnectionInfo connection={connection} />
      </TextWrapper>
      {connection.status ? (
        <Button
          size="small"
          type="ghost"
          danger
          icon={<PauseOutlined />}
          onClick={onDisconnect}
        />
      ) : (
        <Button
          size="small"
          type="primary"
          icon={<CaretRightFilled />}
          onClick={onConnect}
        />
      )}
    </Row>
  );
};
