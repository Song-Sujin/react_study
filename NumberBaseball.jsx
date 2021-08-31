import React, { Component } from "react";

class NumberBaseball extends Component {}

// ES2015 모듈 문법
export const hello = "hello"; // import {hello}
export const bye = "bye"; // import {hello, bye}
export default NumberBaseball; // import NumberBaseball;

// export const를 노드 모듈 시스템에서 표현한다면

// 노드의 모듈 문법 (common js)
// const React = require("react");
// exports.hello = "hello";
// module.exports = NumberBaseball;
