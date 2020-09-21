import { Empty, Table } from "antd";
import React from "react";
import styled from "styled-components";

interface ResultProps {
  data: any[];
}

const StyledTable = styled(Table)`
  width: 100%;
`;

export const Results: React.FC<ResultProps> = (props) => {
  return props.data.length === 0 ? (
    <Empty />
  ) : (
    <StyledTable
      dataSource={props.data}
      columns={Object.keys(props.data[0]).map((c) => ({
        title: c,
        dataIndex: c,
        key: c,
      }))}
    />
  );
};
