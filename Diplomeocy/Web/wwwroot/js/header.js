/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../../../../c\u0000#/diplomeocy/Diplomeocy/Web/Scripts/src/header.ts":
/*!**************************************************************************!*\
  !*** ../../../../../c #/diplomeocy/Diplomeocy/Web/Scripts/src/header.ts ***!
  \**************************************************************************/
/***/ (() => {

eval("$(function () {\r\n    const $joinLink = $('#join-link');\r\n    const $inputContainer = $('#join-input-container');\r\n    const $input = $('#join-input');\r\n    const $submitButton = $('#join-submit-button');\r\n    $joinLink.on('mouseenter', function () {\r\n        $inputContainer.removeClass('hidden-container').addClass('visible-container');\r\n        $joinLink.addClass('hidden');\r\n    });\r\n    const hideInput = () => {\r\n        if ($input.is(':focus') || $inputContainer.is(':hover'))\r\n            return;\r\n        $inputContainer.removeClass('visible-container').addClass('hidden-container');\r\n        $joinLink.removeClass('hidden');\r\n        $input.val('');\r\n    };\r\n    $inputContainer.on('mouseleave', hideInput);\r\n    $input.on('blur', hideInput);\r\n    $input.on('mouseleave', hideInput);\r\n    $input.on('keypress', function (e) {\r\n        if (e.which === 13) {\r\n            $submitButton.trigger('click');\r\n        }\r\n    });\r\n});\r\n\n\n//# sourceURL=webpack://myapp-client-bundle/../../../../../c%00#/diplomeocy/Diplomeocy/Web/Scripts/src/header.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["../../../../../c\u0000#/diplomeocy/Diplomeocy/Web/Scripts/src/header.ts"]();
/******/ 	
/******/ })()
;