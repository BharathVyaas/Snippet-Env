"use client";

import { useSession } from "next-auth/react";
import React from "react";

function CardNav({ username }) {
  const { data: session } = useSession();

  return (
    <div className="border-b border-text-secondary px-3 py-2 flex space-x-1 items-center">
      <img
        className="rounded-3xl border-2 border-border-light"
        width={30}
        height={30}
        src={session?.user?.image || null}
        alt={session?.user?.name}
      />
      <p className="text-sm">{username || "placeholder"}</p>
    </div>
  );
}

export default CardNav;
