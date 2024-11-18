import { Editor } from "@monaco-editor/react";
import React from "react";

function Output({ output }) {
  return (
    <div className="py-1 my-auto h-full">
      <Editor
        width={300}
        height={56}
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
