import React from "react";
let stylePosition = {
  position: "relative",
  top: "70px",
};
function PosRelDiv(props) {
  return <div style={stylePosition}>{props.children}</div>;
}
export default PosRelDiv;
