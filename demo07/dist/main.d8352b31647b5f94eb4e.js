(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _print__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./print */ "./print.js");




function component() {
  var element = document.createElement('div');

  // lodash 是由当前 script 脚本 import 进来的
  element.innerHTML = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.join(['Hello', 'webpack'], ' ');
  element.onclick = _print__WEBPACK_IMPORTED_MODULE_1__["default"].bind(null, 'Hello webpack!');

  return element;
}

document.body.appendChild(component());


/***/ }),

/***/ "./print.js":
/*!******************!*\
  !*** ./print.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return print; });
function print(text) {
  console.log(text)
};


/***/ })

},[["./index.js","runtime","vendors"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9wcmludC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBdUI7O0FBRUs7O0FBRTVCO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsNkNBQUM7QUFDdkIsb0JBQW9CLDhDQUFLOztBQUV6QjtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7O0FDZEE7QUFBQTtBQUFlO0FBQ2Y7QUFDQSIsImZpbGUiOiJtYWluLmQ4MzUyYjMxNjQ3YjVmOTRlYjRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IFByaW50IGZyb20gJy4vcHJpbnQnO1xuXG5mdW5jdGlvbiBjb21wb25lbnQoKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgLy8gbG9kYXNoIOaYr+eUseW9k+WJjSBzY3JpcHQg6ISa5pysIGltcG9ydCDov5vmnaXnmoRcbiAgZWxlbWVudC5pbm5lckhUTUwgPSBfLmpvaW4oWydIZWxsbycsICd3ZWJwYWNrJ10sICcgJyk7XG4gIGVsZW1lbnQub25jbGljayA9IFByaW50LmJpbmQobnVsbCwgJ0hlbGxvIHdlYnBhY2shJyk7XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29tcG9uZW50KCkpO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJpbnQodGV4dCkge1xuICBjb25zb2xlLmxvZyh0ZXh0KVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=