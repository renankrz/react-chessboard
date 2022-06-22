import React, { useEffect, useState } from "react";
import Square from "./Square";
import bp from "../img/bp.png";
import br from "../img/br.png";
import bn from "../img/bn.png";
import bb from "../img/bb.png";
import bq from "../img/bq.png";
import bk from "../img/bk.png";
import wp from "../img/wp.png";
import wr from "../img/wr.png";
import wn from "../img/wn.png";
import wb from "../img/wb.png";
import wq from "../img/wq.png";
import wk from "../img/wk.png";

const initialFen = [
  { squareId: "0", pieceSrc: br },
  { squareId: "1", pieceSrc: bn },
  { squareId: "2", pieceSrc: bb },
  { squareId: "3", pieceSrc: bq },
  { squareId: "4", pieceSrc: bk },
  { squareId: "5", pieceSrc: bb },
  { squareId: "6", pieceSrc: bn },
  { squareId: "7", pieceSrc: br },
  { squareId: "8", pieceSrc: bp },
  { squareId: "9", pieceSrc: bp },
  { squareId: "10", pieceSrc: bp },
  { squareId: "11", pieceSrc: bp },
  { squareId: "12", pieceSrc: bp },
  { squareId: "13", pieceSrc: bp },
  { squareId: "14", pieceSrc: bp },
  { squareId: "15", pieceSrc: bp },
  { squareId: "16", pieceSrc: "" },
  { squareId: "17", pieceSrc: "" },
  { squareId: "18", pieceSrc: "" },
  { squareId: "19", pieceSrc: "" },
  { squareId: "20", pieceSrc: "" },
  { squareId: "21", pieceSrc: "" },
  { squareId: "22", pieceSrc: "" },
  { squareId: "23", pieceSrc: "" },
  { squareId: "24", pieceSrc: "" },
  { squareId: "25", pieceSrc: "" },
  { squareId: "26", pieceSrc: "" },
  { squareId: "27", pieceSrc: "" },
  { squareId: "28", pieceSrc: "" },
  { squareId: "29", pieceSrc: "" },
  { squareId: "30", pieceSrc: "" },
  { squareId: "31", pieceSrc: "" },
  { squareId: "32", pieceSrc: "" },
  { squareId: "33", pieceSrc: "" },
  { squareId: "34", pieceSrc: "" },
  { squareId: "35", pieceSrc: "" },
  { squareId: "36", pieceSrc: "" },
  { squareId: "37", pieceSrc: "" },
  { squareId: "38", pieceSrc: "" },
  { squareId: "39", pieceSrc: "" },
  { squareId: "40", pieceSrc: "" },
  { squareId: "41", pieceSrc: "" },
  { squareId: "42", pieceSrc: "" },
  { squareId: "43", pieceSrc: "" },
  { squareId: "44", pieceSrc: "" },
  { squareId: "45", pieceSrc: "" },
  { squareId: "46", pieceSrc: "" },
  { squareId: "47", pieceSrc: "" },
  { squareId: "48", pieceSrc: wp },
  { squareId: "49", pieceSrc: wp },
  { squareId: "50", pieceSrc: wp },
  { squareId: "51", pieceSrc: wp },
  { squareId: "52", pieceSrc: wp },
  { squareId: "53", pieceSrc: wp },
  { squareId: "54", pieceSrc: wp },
  { squareId: "55", pieceSrc: wp },
  { squareId: "56", pieceSrc: wr },
  { squareId: "57", pieceSrc: wn },
  { squareId: "58", pieceSrc: wb },
  { squareId: "59", pieceSrc: wq },
  { squareId: "60", pieceSrc: wk },
  { squareId: "61", pieceSrc: wb },
  { squareId: "62", pieceSrc: wn },
  { squareId: "63", pieceSrc: wr },
];

const Board = () => {
  const [fen, setFen] = useState(initialFen);
  const [flyingObject, setFlyingObject] = useState(null);

  const onMouseMove = (e) => {
    const element = flyingObject.pieceImgElement;
    element.style.left = `${e.pageX - element.offsetWidth / 2}px`;
    element.style.top = `${e.pageY - element.offsetHeight / 2}px`;
  };

  const takePiece = (e, squareId, pieceSrc) => {
    const element = e.target;
    setFlyingObject({
      originSquareId: squareId,
      pieceSrc,
      pieceImgElement: element,
    });
    element.classList.add("flying");
    element.style.left = `${e.pageX - element.offsetWidth / 2}px`;
    element.style.top = `${e.pageY - element.offsetHeight / 2}px`;
  };

  const dropPiece = (e, squareId) => {
    if (!flyingObject) {
      return;
    }

    if (flyingObject.originSquareId === squareId) {
      flyingObject.pieceImgElement.classList.remove("flying");
      setFlyingObject(null);
      return;
    }

    if (
      e.target.classList.contains("square") ||
      e.target.classList.contains("piece")
    ) {
      const newFen = [...fen];
      newFen[flyingObject.originSquareId] = {
        squareId: flyingObject.originSquareId,
        pieceSrc: "",
      };
      newFen[squareId] = {
        squareId,
        pieceSrc: flyingObject.pieceSrc,
      };
      setFen(newFen);
    }
    setFlyingObject(null);
  };

  const cancelDrag = (e) => {
    if (
      !e.target.classList ||
      (!e.target.classList.contains("square") &&
        !e.target.classList.contains("piece"))
    ) {
      flyingObject.pieceImgElement.classList.remove("flying");
      setFlyingObject(null);
    }
  };

  useEffect(() => {
    if (flyingObject) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", cancelDrag);
    }
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", cancelDrag);
    };
  }, [flyingObject]);

  return (
    <div className="board">
      {fen.map((square) => (
        <Square
          key={square.squareId}
          id={square.squareId}
          pieceId={square.squareId + square.pieceSrc}
          pieceSrc={square.pieceSrc}
          onMouseDown={takePiece}
          onMouseUp={dropPiece}
          allowHoverStyle={!!flyingObject}
        />
      ))}
    </div>
  );
};

export default Board;
