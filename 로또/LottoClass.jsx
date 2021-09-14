import React, { Component } from "react";
import Ball from "./Ball";

function getWinNumbers() {
  // 계산량이 많은 함수이기 때문에 반복실행되면 안 된다.
  console.log("getWinNumbers");
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]); // random으로 아무거나 하나씩 뽑아서 옆에 배열로 옮기는 셔플
  }
  const bonusNumber = shuffle[shuffle.length - 1]; // 마지막 숫자를 보너스로 하기
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c); // 앞에서 6개는 로또 당첨 숫자
  return [...winNumbers, bonusNumber];
}
class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(), // 처음에 당첨 숫자를 미리 뽑아두기
    winBalls: [],
    bonus: null, // 보너스 공
    redo: false,
  };

  timeouts = [];

  runTimeouts = () => {
    const { winNumbers } = this.state;
    // 보통 비동기에다가 변수 같이 쓰면 클로저 문제가 발생하는데 let을 쓰면 문제 안생긴다
    for (let i = 0; i < winNumbers.length - 1; i++) {
      // 마지막 보너스공은 빠져야 하니까 1빼주기
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]],
          };
        });
      }, (i + 1) * 1000); // 1초마다
    }
    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      });
    }, 7000);
  };

  // 시작하자마자 실행되기 때문에
  componentDidMount() {
    this.runTimeouts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.winBalls.length === 0) {
      this.runTimeouts();
    }
  }
  componentWillUnmount() {
    this.timeouts.forEach((v) => {
      clearTimeout(v);
    });
  }

  onClickRedo = () => {
    this.setState({
      winNumbers: getWinNumbers(), // 처음에 당첨 숫자를 미리 뽑아두기
      winBalls: [],
      bonus: null, // 보너스 공
      redo: false,
    });
    this.timeouts = [];
  };

  render() {
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>당첨 숫자</div>
        <div id="결과창">
          {winBalls.map((v) => (
            <Ball Key={v} number={v} />
          ))}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
      </>
    );
  }
}

export default Lotto;
