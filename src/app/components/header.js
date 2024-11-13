"use client";

import { Eventhandler } from "@/services/event";
import { useSnippet } from "../context/SnippetProvider";
import { useEffect, useState } from "react";
import addIcon from "../assets/add.png";
import Image from "next/image";

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
          <Image
            src={addIcon}
            alt="add"
            width={18}
            height={18}
            title="add new snippet"
          />
          <a
            href="https://www.flaticon.com/free-icons/plus"
            title="plus icons"
            className="hidden"
          >
            Plus icons created by srip - Flaticon
          </a>
        </button>
      </div>
    </div>
  );
}

export default Header;
