import React, { useCallback } from "react";
import { CLICK_CELL } from "./TicTacToe";

const Td = ({ rowIndex, cellIndex, dispatch, cellData }) => {
  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    // 한 번 클릭한 셀은 다시 클릭 못하게
    if (cellData) {
      return;
    }

    // dispatch가 state를 바꾸는건 비동기이다
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex }); // 칸을 클릭한 다음에
    //dispatch({ type: CHANGE_TURN }); // 턴을 바꾸기
  }, [cellData]);
  return <td onClick={onClickTd}>{cellData}</td>;
};

export default Td;
