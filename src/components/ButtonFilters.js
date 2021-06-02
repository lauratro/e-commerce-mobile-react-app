import React from "react";

function ButtonFilters(props) {
  /*   console.log("btn", props.onClick);
  console.log("btnvalue", props.showFilters); */
  let valueBtn = props.showFilters;

  function handleChange() {
    if (valueBtn === true) {
      props.onClick(false);
    } else {
      props.onClick(true);
    }
  }

  return (
    <button
      onClick={handleChange}
      style={{
        marginTop: 30,
        backgroundColor: "green",
        color: "white",
        padding: "5px",
      }}
    >
      Filters
    </button>
  );
}
export default ButtonFilters;
