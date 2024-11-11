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
  const [output, steOutput] = useState();

  useEffect(() => {
    setValue(props.value);
    console.log(props.value);
  }, [props.value]);

  const onChange = (e) => {
    setValue(e);
  };

  const onSave = async () => {
    try {
      const res = await supabase.from("snippet").insert({
        created_by: session.user.email,
        value,
        status_reason: "Active",
      });

      if (res.status === 201) {
        props.callSupa();
      }
    } catch (error) {
      console.error("failed to save data: \n", error);
    }
  };

  const onExecute = async () => {
    try {
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

  return (
    <div className="">
      <div className="pt-[.5px] bg-white">
        <MonacoEditor {...props} value={value} onChange={onChange} />
      </div>

      <div className="py-2 px-6 flex justify-between">
        <div className="space-x-2 py-3">
          <button
            className="border-2 border-accent-dark rounded py-[.2px] text-sm w-[5rem]"
            onClick={onSave}
          >
            Save
          </button>
          <button
            className="bg-accent-dark border-accent-dark border-2 text-text-secondary rounded py-[.2px] text-sm w-[5rem]"
            onClick={onExecute}
          >
            Execute
          </button>
        </div>

        <div>
          <Output output={output} />
        </div>
      </div>
    </div>
  );
}

export default CardBody;
