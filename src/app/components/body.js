"use client";
import { useEffect, useState } from "react";
import MonacoCard from "./body/monacoCard";
import { supabase } from "@/lib/supabaseClient";
import { Eventhandler } from "@/services/event";
import { useSession } from "next-auth/react";
import { useSnippet } from "../context/SnippetProvider";

function Body() {
  const { data: session } = useSession();

  const { snippets, setSnippets } = useSnippet();

  useEffect(() => {
    callSupa(setSnippets);
  }, []);

  useEffect(() => {
    Eventhandler.subscribe("new-snippet", () =>
      setSnippets((prev) => [
        {
          id: 0,
          value: "",
          language: "javascript",
          created_by: session.user.email,
        },
        ...prev,
      ])
    );

    return () => Eventhandler.remove("new-snippet");
  }, [session]);

  const callSupa = async () => {
    try {
      const res = await supabase
        .from("snippet")
        .select("*")
        .order("position", { ascending: false });

      if (res && res.data) setSnippets(res.data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const onDelete = async (id) => {
    try {
      if (id === 0) {
        setSnippets((prev) => {
          const [_, ...rest] = prev;

          return rest;
        });
      } else {
        const res = await supabase.from("snippet").delete("*").eq("id", id);

        if (res.status === 204) callSupa();
        else {
          console.info(`something went wrong cannot delete ${id}`);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onPositionChange = (oldPosition, newPosition) => {
    // Check if `snippets` is an array before proceeding
    if (!Array.isArray(snippets)) {
      console.error("snippets is not an array:", snippets);
      return;
    }

    // Create a deep copy of snippets to avoid mutating the original array directly
    const updatedSnippets = snippets.map((snippet) => ({ ...snippet }));

    // Find the snippet being moved
    const movedSnippet = updatedSnippets.find(
      (snippet) => snippet.position === oldPosition
    );
    if (!movedSnippet) return; // Exit if the snippet to move is not found

    // Adjust positions of other snippets
    updatedSnippets.forEach((snippet) => {
      if (newPosition > oldPosition) {
        // Moving the snippet down
        if (snippet.position > oldPosition && snippet.position <= newPosition) {
          snippet.position--;
        }
      } else if (newPosition < oldPosition) {
        // Moving the snippet up
        if (snippet.position < oldPosition && snippet.position >= newPosition) {
          snippet.position++;
        }
      }
    });

    // Set the new position for the moved snippet
    movedSnippet.position = newPosition;

    // Sort by position to keep the order consistent
    updatedSnippets.sort((a, b) => a.position - b.position);

    // Reverse the order and update the state
    setSnippets(updatedSnippets.reverse());
  };

  return (
    <div className="flex flex-col space-y-20 items-center">
      {snippets.map((snippet) => (
        <MonacoCard
          key={snippet?.id || "new"}
          value={snippet?.value || ""}
          language={snippet?.language || "javascript"}
          username={snippet?.created_by || null}
          createdAt={snippet?.created_at || null}
          status={snippet.status_reason || "new"}
          title={snippet.title || ""}
          //
          snippet={snippet}
          onDelete={onDelete}
          onPositionChange={onPositionChange}
          // to get latest data
          callSupa={callSupa}
        />
      ))}
    </div>
  );
}

export default Body;
