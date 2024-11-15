"use client";
import { useEffect } from "react";
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
          position: snippets?.length || 0,
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

  const onPositionChange = async (oldPosition, newPosition) => {
    if (!Array.isArray(snippets)) {
      console.error("snippets is not an array:", snippets);
      return;
    }

    const updatedSnippets = snippets.map((snippet) => ({ ...snippet }));

    const movedSnippet = updatedSnippets.find(
      (snippet) => snippet.position === oldPosition
    );
    if (!movedSnippet) return;

    const snippetsToUpdate = [];

    updatedSnippets.forEach((snippet) => {
      if (newPosition > oldPosition) {
        if (snippet.position > oldPosition && snippet.position <= newPosition) {
          snippet.position--;
          snippetsToUpdate.push({ id: snippet.id, position: snippet.position });
        }
      } else if (newPosition < oldPosition) {
        if (snippet.position < oldPosition && snippet.position >= newPosition) {
          snippet.position++;
          snippetsToUpdate.push({ id: snippet.id, position: snippet.position });
        }
      }
    });

    movedSnippet.position = newPosition;
    snippetsToUpdate.push({
      id: movedSnippet.id,
      position: movedSnippet.position,
    });

    updatedSnippets.sort((a, b) => a.position - b.position);

    setSnippets(updatedSnippets.reverse());

    try {
      await updateSnippetsInBackend(snippetsToUpdate);
    } catch (error) {
      console.error("Error updating positions in the backend:", error);
    }
  };
  const updateSnippetsInBackend = async (snippets) => {
    try {
      for (let snippet of snippets) {
        await supabase
          .from("snippet")
          .update({ position: snippet.position })
          .eq("id", snippet.id);
      }
    } catch (error) {
      console.error("Error updating snippet position:", error);
    }
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
