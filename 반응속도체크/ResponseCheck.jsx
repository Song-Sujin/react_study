import React, { useState, useRef } from "react";

const ResponseCheck = () => {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("클릭해서 시작하세요.");
  const [result, setResult] = useState([]);
  const timeOut = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScrean = () => {
    if (state === "waiting") {
      setState("ready");
      setMessage("초록색이 되면 클릭하세요.");

      timeOut.current = setTimeout(() => {
        setState("now");
        setMessage("지금 클릭");

        startTime.current = new Date(); // 랜더링이 일어나지 않게 하고 싶으면 this.startTime으로 만들기
      }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초 랜덤
    } else if (state === "ready") {
      // 성급하게 클릭 (빨간색일때 클릭)
      clearTimeout(timeOut.current);
      setState("waiting");
      setMessage("너무 성급하시군요! 초록색이 된 후에 클릭하세요.");
    } else if (state === "now") {
      // 반응속도 체크
      // 클릭하게 되면
      endTime.current = new Date();
      setState("waiting");
      setMessage("클릭해서 시작하세요");
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current];
      });
    }
  };
  const onReset = () => {
    setResult([]);
  };

  const renderAverage = () => {
    // jsx에서의 null은 태그가 아예 없는것을 뜻함
    return result.length === 0 ? null : (
      <>
        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={onReset}>리셋</button>
      </>
    );
  };
  return (
    <>
      <div id="screen" className={state} onClick={onClickScrean}>
        {message}
      </div>
      {renderAverage()}
    </>
  );
};

export default ResponseCheck;
