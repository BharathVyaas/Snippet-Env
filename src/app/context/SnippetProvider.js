"use client";

import { createContext, useContext, useState } from "react";

export const SnippetContext = createContext({
  snippets: [],
  setSnippets: () => {},
});

export const SnippetProvider = ({ children }) => {
  const [snippets, setSnippets] = useState([]);

  return (
    <SnippetContext.Provider value={{ snippets, setSnippets }}>
      {children}
    </SnippetContext.Provider>
  );
};

export const useSnippet = () => {
  const props = useContext(SnippetContext);

  return { ...props };
};
