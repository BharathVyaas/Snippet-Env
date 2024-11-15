"use client";
import React, { useEffect, useState, version } from "react";

import MonacoEditor from "./cardBody/monacoEditor";
import Output from "./cardBody/output";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabaseClient";
import axios from "axios";
import { LANGUAGE_VERSIONS } from "@/constents";

function CardBody(props) {
  const { data: session } = useSession();

  const [value, setValue] = useState(props.value || "");
  const [title, setTitle] = useState(props.title || "");
  const [output, steOutput] = useState();

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const onChange = (e) => {
    setValue(e);
  };

  const onSave = async () => {
    console.log(props);
    try {
      const dataObj = {
        created_by: session.user.email,
        value,
        status_reason: "Active",
        title: title,
        position: props.snippet.position,
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
        (props.language === "javascript" && value.includes("prompt")) ||
        value.includes("console") ||
        value.includes("alert") ||
        value.includes("confirm")
      ) {
        eval(value);
      }

      const res = await axios.post("https://emkc.org/api/v2/piston/execute", {
        language: props.language,
        version: LANGUAGE_VERSIONS[props.language],
        files: [{ content: value }],
      });

      if (res.status === 200) {
        steOutput(res.data.run?.output);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className="">
      <div className="pt-[.5px] bg-white">
        <MonacoEditor {...props} value={value} onChange={onChange} />
      </div>

      <div className="py-2 px-4 flex justify-between">
        <div className="w-[44%]">
          <div className="w-[full]">
            <input
              className="w-[100%] px-1 rounded bg-background-main outline-none border-b-2 text-text-secondary text-sm border-border-light"
              placeholder="title..."
              value={title}
              onChange={onTitleChange}
            />
          </div>
          <div className="space-x-2 py-3">
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

        <div className="w-[50%]">
          <Output output={output} />
        </div>
      </div>
    </div>
  );
}

export default CardBody;
