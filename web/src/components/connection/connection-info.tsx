import React from "react";
import styled from "styled-components";
import { IConnection } from "../../interfaces/connection.interface";

interface ConnectionInfoProps {
  connection: IConnection;
}

const Info = styled.span`
  color: #444;
  font-style: italic;
`;

export const ConnectionInfo: React.FC<ConnectionInfoProps> = ({
  connection,
}) => {
  return (
    <Info>
      {connection.user}@{connection.host}:{connection.port}/
      {connection.database}
    </Info>
  );
};
