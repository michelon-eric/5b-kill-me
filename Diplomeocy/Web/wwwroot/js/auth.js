/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../../../c\u0000#/diplomeocy/Diplomeocy/Web/Scripts/src/auth.ts":
/*!************************************************************************!*\
  !*** ../../../../../c #/diplomeocy/Diplomeocy/Web/Scripts/src/auth.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _results__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./results */ \"../../../../../c\\u0000#/diplomeocy/Diplomeocy/Web/Scripts/src/results.ts\");\n\r\nconst handleResult = (result) => {\r\n    $('.is-invalid').removeClass('is-invalid');\r\n    $('.text-danger').text('');\r\n    if ((0,_results__WEBPACK_IMPORTED_MODULE_0__.isErrorResult)(result)) {\r\n        result.errors.forEach((error) => {\r\n            $(`#${error.field.toLowerCase()}`).addClass('is-invalid');\r\n            $(`#${error.field.toLowerCase()}`).siblings('.text-danger').text(error.errors.join(', '));\r\n        });\r\n    }\r\n    if ((0,_results__WEBPACK_IMPORTED_MODULE_0__.isNotFoundResult)(result)) {\r\n        $(`#username`).addClass('is-invalid').siblings('.text-danger').text(result.what);\r\n    }\r\n    if ((0,_results__WEBPACK_IMPORTED_MODULE_0__.isRedirectResult)(result)) {\r\n        window.location.href = result.destination;\r\n    }\r\n};\r\nwindow.registerCallback = (htmx, element, event) => {\r\n    const result = JSON.parse(event.detail.xhr.responseText);\r\n    console.log(result);\r\n    handleResult(result);\r\n};\r\nwindow.loginCallback = (htmx, element, event) => {\r\n    const result = JSON.parse(event.detail.xhr.responseText);\r\n    handleResult(result);\r\n};\r\nwindow.pfpOnChange = () => {\r\n    const $element = $('#profile-picture');\r\n    const $image = $('#profile-picture-preview');\r\n    $image.attr('src', $element.val());\r\n};\r\n\n\n//# sourceURL=webpack://myapp-client-bundle/../../../../../c%00#/diplomeocy/Diplomeocy/Web/Scripts/src/auth.ts?");

/***/ }),

/***/ "../../../../../c\u0000#/diplomeocy/Diplomeocy/Web/Scripts/src/results.ts":
/*!***************************************************************************!*\
  !*** ../../../../../c #/diplomeocy/Diplomeocy/Web/Scripts/src/results.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   isErrorResult: () => (/* binding */ isErrorResult),\n/* harmony export */   isNotFoundResult: () => (/* binding */ isNotFoundResult),\n/* harmony export */   isRedirectResult: () => (/* binding */ isRedirectResult)\n/* harmony export */ });\nconst isErrorResult = (result) => result.success === false && 'errors' in result;\r\nconst isNotFoundResult = (result) => result.success === false && 'what' in result;\r\nconst isRedirectResult = (result) => result.success === true && 'destination' in result;\r\n\n\n//# sourceURL=webpack://myapp-client-bundle/../../../../../c%00#/diplomeocy/Diplomeocy/Web/Scripts/src/results.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("../../../../../c\u0000#/diplomeocy/Diplomeocy/Web/Scripts/src/auth.ts");
/******/ 	
/******/ })()
;