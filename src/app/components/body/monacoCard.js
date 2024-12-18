"use client";

import React from "react";
import CardNav from "./monacoCard/cardNav";
import CardBody from "./monacoCard/cardBody";

function MonacoCard(props) {
  return (
    <div className="w-[60%] max-w-[800px] h-[600px] shadow-xl rounded-md bg-background-card text-text-primary">
      <div className="">
        <CardNav
          username={props.username}
          id={props.snippet.id}
          onDelete={props.onDelete}
          position={props.snippet.position || 0}
          onPositionChange={props.onPositionChange}
        />
      </div>

      <div className="">
        <CardBody {...props} />
      </div>
    </div>
  );
}

export default MonacoCard;
