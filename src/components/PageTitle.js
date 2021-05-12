import React, { useEffect } from "react";
import PosRelDiv from "./PositionRelDiv";

function Page(props) {
  useEffect(() => {
    document.title = `${props.title} | LBY`;
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <PosRelDiv>{props.children}</PosRelDiv>
    </>
  );
}
export default Page;
