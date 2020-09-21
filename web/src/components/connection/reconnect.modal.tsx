import { Input, Modal, Form, Row, Button } from "antd";
import React from "react";
import { IConnection } from "../../interfaces/connection.interface";
import { ConnectionService } from "../../services/connect.service";
import { ConnectionInfo } from "./connection-info";

interface ReconnectModalProps {
  connection: IConnection;
  visible: boolean;
  onCancel(error?: string): void;
  onConnect(connectionId: string): void;
}

export const ReconnectModal: React.FC<ReconnectModalProps> = ({
  connection,
  visible,
  onConnect,
  onCancel,
}) => {
  const onReconnect = async (data: { password: string }) => {
    const res = await ConnectionService.connect({
      host: connection.host,
      port: connection.port,
      user: connection.user,
      database: connection.database,
      password: data.password,
    });

    const { connectionId, error } = await res.json();

    if (connectionId) {
      onConnect(connectionId);
    } else {
      onCancel(error);
    }
  };

  return (
    <Modal
      title="Connect"
      visible={visible}
      footer={null}
      onCancel={() => onCancel()}
    >
      <Form
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{}}
        onFinish={onReconnect}
        style={{ width: "100%" }}
      >
        <Form.Item label="Connection">
          <ConnectionInfo connection={connection} />
        </Form.Item>

        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>

        <Row justify="end">
          <Form.Item style={{ marginRight: "8px" }}>
            <Button onClick={() => onCancel()}>Cancel</Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Connect
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  );
};
