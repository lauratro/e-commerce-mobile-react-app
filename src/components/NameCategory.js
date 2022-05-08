import React, { useEffect } from "react";


function Category(props) {
  useEffect(() => {
    document.title = `${props.title} | LBY`;
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <p style={{ fontStyle: "italic" }}>LBY | Category : {props.cat}</p>
    </>
  );
}
export default Category;
