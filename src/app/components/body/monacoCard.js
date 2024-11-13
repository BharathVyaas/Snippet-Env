import React from "react";
import CardNav from "./monacoCard/cardNav";
import CardBody from "./monacoCard/cardBody";

function MonacoCard(props) {
  return (
    <div className="w-[60%] max-w-[600px] h-[450px] shadow-xl rounded-md bg-background-card text-text-primary">
      <div className="">
        <CardNav
          username={props.username}
          id={props.snippet.id}
          onDelete={props.onDelete}
        />
      </div>

      <div className="">
        <CardBody {...props} />
      </div>
    </div>
  );
}

export default MonacoCard;
