"use client";
import React, { useEffect, useState } from "react";

import MonacoEditor from "./cardBody/monacoEditor";
import Output from "./cardBody/output";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabaseClient";
import axios from "axios";
import { LANGUAGE_VERSIONS } from "@/constents";
import { useSnippet } from "@/app/context/SnippetProvider";

function CardBody(props) {
  const { data: session } = useSession();
  const { snippets } = useSnippet();

  const [value, setValue] = useState(props.value || "");
  const [title, setTitle] = useState(props.title || "");
  const [output, setOutput] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const onChange = (e) => {
    setValue(e);
  };

  const onSave = async () => {
    try {
      const dataObj = {
        created_by: session?.user?.email,
        value,
        status_reason: "Active",
        title: title,
        position: props.snippet.position || snippets?.length,
      };

      if (props.snippet.id === 0) {
        const res = await supabase.from("snippet").insert(dataObj);

        if (res.status === 201) {
          props.callSupa();
        }
      } else {
        const res = await supabase
          .from("snippet")
          .update(dataObj)
          .eq("id", props.snippet.id);

        if (res.status === 201) {
          props.callSupa();
        }
      }
    } catch (error) {
      console.error("failed to save data: \n", error);
    }
  };

  const onExecute = async () => {
    try {
      if (
        (selectedLanguage === "javascript" && value.includes("prompt")) ||
        value.includes("console") ||
        value.includes("alert") ||
        value.includes("confirm")
      ) {
        eval(value);
      }
    } catch (error) {
      console.error(error);
    }
    try {
      const res = await axios.post("https://emkc.org/api/v2/piston/execute", {
        language: selectedLanguage,
        version: LANGUAGE_VERSIONS[selectedLanguage],
        files: [{ content: value }],
      });

      if (res.status === 200) {
        setOutput(res.data.run?.output);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  return (
    <div>
      <div className="pt-[.5px] bg-white">
        <MonacoEditor {...props} value={value} onChange={onChange} />
      </div>

      <div className="py-4 px-6 flex justify-between">
        <div className="w-[40%]">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Language
            </label>
            <select
              className="w-[80%] px-2 py-1 rounded bg-background-main border-2 text-text-secondary text-sm border-border-light"
              value={selectedLanguage}
              onChange={onLanguageChange}
            >
              {Object.keys(LANGUAGE_VERSIONS).map((lang) => (
                <option key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="my-1">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              className="w-[80%] px-2 py-1 rounded bg-background-main outline-none border-2 text-text-secondary text-sm border-border-light"
              placeholder="Enter title..."
              value={title}
              onChange={onTitleChange}
            />
          </div>

          <div className="space-x-2 mt-3">
            <button
              className="border-2 border-accent-dark rounded py-[.2px] text-sm w-[5rem]"
              onClick={onSave}
            >
              {props.snippet?.id === 0 ? "Create" : "Update"}
            </button>
            <button
              className="bg-accent-dark border-accent-dark border-2 text-text-secondary rounded py-[.2px] text-sm w-[5rem]"
              onClick={onExecute}
            >
              Execute
            </button>
          </div>
        </div>

        <div className="w-[60%] flex justify-end">
          <Output output={output} />
        </div>
      </div>
    </div>
  );
}

export default CardBody;
