import { Editor } from "@monaco-editor/react";
import React from "react";

function Output({ output }) {
  return (
    <div className="bg-white py-2 my-auto h-full">
      <Editor
        width={200}
        height={40}
        language="plaintext"
        value={output}
        options={{
          minimap: {
            enabled: false,
          },
          lineNumbers: "off",
          readOnly: true,
        }}
      />
    </div>
  );
}

export default Output;
