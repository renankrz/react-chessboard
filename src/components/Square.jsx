import React, { useState } from "react";
import PropTypes from "prop-types";
import Piece from "./Piece";

const Square = ({
  id,
  pieceId,
  pieceSrc,
  onMouseDown,
  onMouseUp,
  allowHoverStyle,
}) => {
  const [hoverStyle, setHoverStyle] = useState("");

  const handleOnMouseDown = (e) => {
    onMouseDown(e, id, pieceSrc);
    setHoverStyle("green-border");
  };

  const handleOnMouseUp = (e) => {
    onMouseUp(e, id);
    setHoverStyle("");
  };

  const handleOnMouseEnter = () => {
    if (allowHoverStyle) {
      setHoverStyle("green-border");
    }
  };

  const handleOnMouseLeave = () => {
    setHoverStyle("");
  };

  return (
    <div
      id={id}
      className={`square ${hoverStyle}`}
      onMouseUp={handleOnMouseUp}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      {pieceSrc && (
        <Piece id={pieceId} src={pieceSrc} onMouseDown={handleOnMouseDown} />
      )}
    </div>
  );
};

Square.propTypes = {
  id: PropTypes.string.isRequired,
  pieceSrc: PropTypes.string.isRequired,
  pieceId: PropTypes.string.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  allowHoverStyle: PropTypes.bool.isRequired,
};

export default Square;
