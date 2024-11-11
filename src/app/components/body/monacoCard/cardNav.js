"use client";

import { useSession } from "next-auth/react";
import React from "react";

function CardNav() {
  const { data: session } = useSession();

  return (
    <div className="border-b border-text-secondary px-3 py-2 flex space-x-1 items-center">
      <img
        className="rounded-3xl border-2 border-border-light"
        width={24}
        height={24}
        src={session?.user?.image || null}
        alt={session?.user?.name}
      />
      <p className="text-sm">{session?.user?.name || "placeholder"}</p>
    </div>
  );
}

export default CardNav;
