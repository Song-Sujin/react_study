import React from "react";
import Tr from "./Tr";

const Table = ({ onClick, tableData, dispatch }) => {
  return (
    <table>
      {Array(tableData.length) //요소가 3인 배열을 각각 tr로 만들기
        .fill()
        .map((tr, i) => (
          <Tr dispatch={dispatch} rowIndex={i} rowData={tableData[i]} />
        ))}
    </table>
  );
};

export default Table;
