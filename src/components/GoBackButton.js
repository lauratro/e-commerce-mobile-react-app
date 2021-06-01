import React from "react";
import { useHistory } from "react-router-dom";
import UndoIcon from "@material-ui/icons/Undo";
const colorIcon = {
  color: "rgb(2, 48, 32)",
};
const marginAppBarElem = {
  margin: 10,
};
export const GoBackButton = () => {
  let history = useHistory();
  return (
    <>
      <button onClick={() => history.goBack()} style={marginAppBarElem}>
        <UndoIcon style={colorIcon} />
      </button>
    </>
  );
};
