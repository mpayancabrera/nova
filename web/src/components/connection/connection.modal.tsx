import React from "react";
import { Form, Input, Button, Row } from "antd";
import {
  IConnection,
  ICredentials,
} from "../../interfaces/connection.interface";
import { ConnectionService } from "../../services/connect.service";
import Modal from "antd/lib/modal/Modal";

interface ConnectModalProps {
  visible: boolean;
  onConnect: (connection: IConnection) => void;
  onCancel: (error?: string) => void;
}

export const ConnectModal: React.FC<ConnectModalProps> = (props) => {
  const onFinish = async (credentials: ICredentials) => {
    const res = await ConnectionService.connect(credentials);

    const { connectionId, error } = await res.json();

    if (connectionId) {
      const info: IConnection = {
        id: connectionId,
        status: true,
        host: credentials.host,
        port: credentials.port,
        user: credentials.user,
        database: credentials.database,
      };

      props.onConnect(info);
    } else {
      props.onCancel(error);
    }
  };

  return (
    <Modal
      title="New connection"
      visible={props.visible}
      footer={null}
      onCancel={() => props.onCancel()}
    >
      <Form
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ port: 5432 }}
        onFinish={onFinish}
        style={{ width: "100%" }}
      >
        <Form.Item
          label="Host"
          name="host"
          rules={[{ message: "Please introduce the host." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Port"
          name="port"
          rules={[{ message: "Please introduce the port." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="User"
          name="user"
          rules={[{ message: "Please introduce a username." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ message: "Please introduce the password." }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Database"
          name="database"
          rules={[{ message: "Please introduce the database." }]}
        >
          <Input />
        </Form.Item>

        <Row justify="end">
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
