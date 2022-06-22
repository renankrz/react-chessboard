import React from "react";
import PropTypes from "prop-types";

const Piece = ({ id, src, onMouseDown }) => {
  const handleOnDragStart = (e) => {
    e.preventDefault();
  };

  return (
    <img
      id={id}
      className="piece"
      src={src}
      alt=""
      onDragStart={handleOnDragStart}
      onMouseDown={onMouseDown}
    />
  );
};

Piece.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  onMouseDown: PropTypes.func.isRequired,
};

export default Piece;
