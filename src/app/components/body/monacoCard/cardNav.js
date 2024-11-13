"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect } from "react";
import binIcon from "../../../assets/bin.png";

function CardNav({ username, id, onDelete, position, onPositionChange }) {
  const { data: session } = useSession();

  return (
    <div className="border-b border-text-secondary px-3 py-2 flex justify-between">
      <div className="flex space-x-1 items-center">
        <img
          className="rounded-3xl border-2 border-border-light"
          width={30}
          height={30}
          src={session?.user?.image || null}
          alt={session?.user?.name || "User"}
        />
        <p className="text-sm">{username || "placeholder"}</p>
      </div>

      {username === session.user?.email && (
        <div className="flex space-x-2">
          <div>
            <input
              type="number"
              className="w-12 rounded bg-background-main border-b-2 border-border-light text-text-secondary"
              value={position}
              onChange={(e) =>
                onPositionChange(position, Number(e.target.value))
              }
            />
          </div>
          <div className="pt-1 pr-1">
            <button onClick={() => onDelete(id)}>
              <Image src={binIcon} alt="delete" width={18} height={18} />
            </button>
            <a
              className="hidden"
              href="https://www.flaticon.com/free-icons/trash"
              title="trash icons"
            >
              Trash icons created by Freepik - Flaticon
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardNav;
