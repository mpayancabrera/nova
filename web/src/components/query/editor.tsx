import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-pgsql";
import "ace-builds/src-noconflict/theme-github";

interface EditorProps {
  value: string;
  onChange(value: string): void;
}

export const Editor: React.FC<EditorProps> = (props) => {
  const onChange = (value: string) => {
    props.onChange(value);
  };

  return (
    <AceEditor
      mode="pgsql"
      theme="github"
      value={props.value}
      onChange={onChange}
      style={{ width: "100%", height: "350px" }}
    ></AceEditor>
  );
};
