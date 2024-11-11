"use client";

import { Eventhandler } from "@/services/event";
import { useSnippet } from "../context/SnippetProvider";
import { useEffect, useState } from "react";

function Header() {
  const { snippets } = useSnippet([]);

  const [disableAddSnippet, setDisableAddSnippet] = useState(false);

  useEffect(() => {
    if (snippets[0]?.id === 0) {
      if (!disableAddSnippet) setDisableAddSnippet(true);
    } else {
      if (disableAddSnippet) setDisableAddSnippet(false);
    }
  }, [snippets]);

  return (
    <div className="flex justify-between min-w-full px-10 py-6 border-b border-text-secondary text-text-primary">
      <div>Pi-Square</div>

      <div>
        <button
          disabled={disableAddSnippet}
          onClick={() => {
            Eventhandler.notify("new-snippet");
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Header;
