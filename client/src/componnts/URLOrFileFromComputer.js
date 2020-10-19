import React from "react";
import "./css.css";

const { useState } = React;

function URLOrFileFromComputer(props) {
  const [display, setDisplay] = useState({
    displayDefaultNone: "display-none",
    displayDefaultBlock: "",
    URLOrFileFromComputer: "or enter an address URL",
  });

  return (
    <div>
      <input
        className={display.displayDefaultNone}
        type="text"
        name="image"
        placeholder={"image"}
        onChange={(e) => {
          props.func(e.target.value, props.product);
        }}
      />
      <input
        className={display.displayDefaultBlock}
        type="file"
        name="image"
        onClick={(e) => {
          console.log(e.target.value);
        }}
      />
      <br />
      <span
        onClick={(e) => {
          if (display.displayDefaultNone) {
            display.displayDefaultNone = "";
            display.displayDefaultBlock = "display-none";
            display.URLOrFileFromComputer =
              "or select a file from your computer";
          } else {
            display.displayDefaultNone = "display-none";
            display.displayDefaultBlock = "";
            display.URLOrFileFromComputer = "or enter an address URL";
          }
          setDisplay({ ...display });
        }}
        style={{
          cursor: "pointer",

          padding: "8px",
          fontWeight: 700,
          userSelect: "none",
        }}
      >
        {display.URLOrFileFromComputer}
      </span>
    </div>
  );
}

export default URLOrFileFromComputer;
