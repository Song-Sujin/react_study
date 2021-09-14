import React, { memo } from "react";

// state를 안 쓰면 이렇게 그냥 함수 컴포넌트를 써도 된다
// useState, useEffect를 안쓰면 그냥 함수 컴포넌트라고 부른다
const Ball = memo(({ number }) => {
  let background;
  // 공 색깔 구별하기
  if (number <= 10) {
    background = "red";
  } else if (number <= 20) {
    background = "orange";
  } else if (number <= 30) {
    background = "yello";
  } else if (number <= 40) {
    background = "blue";
  } else {
    background = "green";
  }
  return (
    <div className="ball" style={{ background }}>
      {number}
    </div>
  );
});

export default Ball;
