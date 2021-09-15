import React, { useState, useEffect, useReducer, useCallback } from "react";
import Table from "./Table";

const initialState = {
  winner: "",
  turn: "O",
  tableData: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  recentCell: [-1, -1], // 내가 방금 선택한 셀을 기억하기. 초기화는 없는 칸으로
};

export const SET_WINNER = "SET_WINNER";
export const CLICK_CELL = "CLICK_CELL";
export const CHANGE_TURN = "CHANGE_TURN";
export const RESET_GAME = "RESET_GAME";

const reducer = (state, action) => {
  // state를 어떻게 바꿀지
  switch (action.type) {
    case SET_WINNER:
      // state.winner = action.winner; 이렇게 하면 안됨.
      return {
        ...state,
        winner: action.winner,
      };
    case CLICK_CELL: {
      const tableData = [...state.tableData]; // 예전의 tableData를 얕은 복사를 해주고
      tableData[action.row] = [...tableData[action.row]]; // 여기까지 얕은 복사(immer라는 라이브러리로 가독성 해결)
      tableData[action.row][action.cell] = state.turn; // 그 칸에다가 현재 턴. O면 O가 그 칸에 들어가게

      return {
        ...state,
        tableData, // 칸을 클릭할 때 마다 tableData도 바꾸고
        recentCell: [action.row, action.cell], // 방금 선택한 셀도 바꾸고
      };
    }
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === "O" ? "X" : "O",
      };
    }
    case RESET_GAME: {
      return {
        ...state,
        turn: "O",
        tableData: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ],
        recentCell: [-1, -1],
      };
    }
    default:
      return state;
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;

  // const [winner, setWinner] = useState("");
  // const [turn, setTurn] = useState("O");
  // const [tableData, setTableData] = useState([
  // ["", "", ""],
  // ["", "", ""],
  // ["", "", ""],
  // ]);

  // component에 넣는 이벤트들은 다 useCallback을 쓴다
  const onClickTable = useCallback(() => {
    dispatch({ type: SET_WINNER, winner: "O" });
  }, []);

  useEffect(() => {
    const [row, cell] = recentCell;
    if (row < 0) {
      // -1 에는 실행되지 않게 (처음 랜더링 될 때도 실행되기 때문에)
      return;
    }
    let win = false; // 처음에는 승자가 없다
    // 가로줄 검사
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    }
    // 세로줄 검사
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      win = true;
    }
    // 오른쪽 대각선 검사
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true;
    }
    // 왼쪽 대각선 검사
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true;
    }

    if (win) {
      // 승리시
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_GAME });
    } else {
      // 무승부검사 -> 테이블이 다 찼는지
      let all = true; // 기본적으로 칸이 다 차있다고 치고 (true면 무승부라는 뜻)
      tableData.forEach((row) => {
        row.forEach((cell) => {
          if (!cell) {
            all = false; // 하나라도 안 차있으면 false로 변경
          }
        });
      });
      if (all) {
        // 무승부임
        dispatch({ type: RESET_GAME });
      } else {
        // 무승부가 아니므로 다음사람 턴으로 변경
        dispatch({ type: CHANGE_TURN }); // 턴을 바꾸기. 이긴게 아니면 게임이 지속되어야 하니까 그 때 턴 바꾸기
      }
    }
  }, [recentCell]); // 클릭한 셀이 바뀔때마다

  return (
    <>
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
      {winner && <div>{winner}님의 승리</div>}
    </>
  );
};

export default TicTacToe;
