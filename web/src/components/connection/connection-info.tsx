import React from "react";
import styled from "styled-components";
import { IConnection } from "../../interfaces/connection.interface";
import { theme } from "../../styles/Theme";

interface ConnectionInfoProps {
  connection: IConnection;
}

const Info = styled.span`
  color: ${theme.colors.grey};
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
