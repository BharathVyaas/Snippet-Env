"use client";

import { Editor } from "@monaco-editor/react";
import React from "react";

function MonacoEditor({
  value,
  onChange,
  language,
  username,
  createdAt,
  status,
  snippet,
}) {
  return (
    <div className="shadow-sm shadow-text-secondary border-t-4 border-white">
      <Editor
        height={320}
        language={language}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default MonacoEditor;
