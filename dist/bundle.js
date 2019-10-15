/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/stylesheets/index.scss":
/*!***************************************!*\
  !*** ./assets/stylesheets/index.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_stylesheets_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/stylesheets/index.scss */ "./assets/stylesheets/index.scss");
/* harmony import */ var _assets_stylesheets_index_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_stylesheets_index_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map */ "./src/map.js");
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_map__WEBPACK_IMPORTED_MODULE_1__);



/***/ }),

/***/ "./src/map.js":
/*!********************!*\
  !*** ./src/map.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

//Width and height of map
var width = 960;
var height = 500; // create svg

var svg = d3.select("body").append("svg").attr("width", width).attr("height", height); // Append empty placeholder g element to the SVG
// g will contain geometry elements

var g = svg.append("g"); // D3 Projection

var albersProjection = d3.geoAlbers().scale(190000).rotate([71.057, 0]).center([0, 42.313]).translate([width / 2, height / 2]); // Create GeoPath function that uses built-in D3 functionality to turn
// lat/lon coordinates into screen coordinates

var geoPath = d3.geoPath().projection(albersProjection); // Classic D3... Select non-existent elements, bind the data, append the elements, and apply attributes

d3.json("data/us.json", function (us_json) {
  g.selectAll("path").data(us_json.features) // is this right? 
  .enter().append("path").attr("fill", "#ccc").attr("stroke", "#333").attr("d", geoPath);
}); // Map schools

var schools = svg.append("g");
d3.json("data/schools.json", function (schools_json) {
  schools.selectAll("path").data(schools_json.features).enter().append("path").attr("fill", "#900").attr("stroke", "#999").attr("d", geoPath);
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3N0eWxlc2hlZXRzL2luZGV4LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tYXAuanMiXSwibmFtZXMiOlsid2lkdGgiLCJoZWlnaHQiLCJzdmciLCJkMyIsInNlbGVjdCIsImFwcGVuZCIsImF0dHIiLCJnIiwiYWxiZXJzUHJvamVjdGlvbiIsImdlb0FsYmVycyIsInNjYWxlIiwicm90YXRlIiwiY2VudGVyIiwidHJhbnNsYXRlIiwiZ2VvUGF0aCIsInByb2plY3Rpb24iLCJqc29uIiwidXNfanNvbiIsInNlbGVjdEFsbCIsImRhdGEiLCJmZWF0dXJlcyIsImVudGVyIiwic2Nob29scyIsInNjaG9vbHNfanNvbiJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLHVDOzs7Ozs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7OztBQ0FDO0FBQ0EsSUFBSUEsS0FBSyxHQUFHLEdBQVo7QUFDQSxJQUFJQyxNQUFNLEdBQUcsR0FBYixDLENBRUE7O0FBQ0EsSUFBSUMsR0FBRyxHQUFHQyxFQUFFLENBQUNDLE1BQUgsQ0FBVyxNQUFYLEVBQ0xDLE1BREssQ0FDRyxLQURILEVBRUxDLElBRkssQ0FFQyxPQUZELEVBRVVOLEtBRlYsRUFHTE0sSUFISyxDQUdDLFFBSEQsRUFHV0wsTUFIWCxDQUFWLEMsQ0FLQTtBQUNBOztBQUNBLElBQUlNLENBQUMsR0FBR0wsR0FBRyxDQUFDRyxNQUFKLENBQVksR0FBWixDQUFSLEMsQ0FFQTs7QUFDQSxJQUFJRyxnQkFBZ0IsR0FBRUwsRUFBRSxDQUFDTSxTQUFILEdBQ2pCQyxLQURpQixDQUNWLE1BRFUsRUFFakJDLE1BRmlCLENBRVQsQ0FBQyxNQUFELEVBQVEsQ0FBUixDQUZTLEVBR2pCQyxNQUhpQixDQUdULENBQUMsQ0FBRCxFQUFJLE1BQUosQ0FIUyxFQUlqQkMsU0FKaUIsQ0FJTixDQUFDYixLQUFLLEdBQUMsQ0FBUCxFQUFTQyxNQUFNLEdBQUMsQ0FBaEIsQ0FKTSxDQUF0QixDLENBT0E7QUFDQTs7QUFDQSxJQUFJYSxPQUFPLEdBQUdYLEVBQUUsQ0FBQ1csT0FBSCxHQUNUQyxVQURTLENBQ0dQLGdCQURILENBQWQsQyxDQUdBOztBQUNBTCxFQUFFLENBQUNhLElBQUgsQ0FBUSxjQUFSLEVBQXdCLFVBQUFDLE9BQU8sRUFBSTtBQUNqQ1YsR0FBQyxDQUFDVyxTQUFGLENBQWEsTUFBYixFQUNLQyxJQURMLENBQ1dGLE9BQU8sQ0FBQ0csUUFEbkIsRUFDOEI7QUFEOUIsR0FFS0MsS0FGTCxHQUdLaEIsTUFITCxDQUdhLE1BSGIsRUFJS0MsSUFKTCxDQUlXLE1BSlgsRUFJbUIsTUFKbkIsRUFLS0EsSUFMTCxDQUtXLFFBTFgsRUFLcUIsTUFMckIsRUFNS0EsSUFOTCxDQU1XLEdBTlgsRUFNZ0JRLE9BTmhCO0FBT0QsQ0FSRCxFLENBV0U7O0FBQ0EsSUFBSVEsT0FBTyxHQUFHcEIsR0FBRyxDQUFDRyxNQUFKLENBQVcsR0FBWCxDQUFkO0FBQ0FGLEVBQUUsQ0FBQ2EsSUFBSCxDQUFRLG1CQUFSLEVBQTZCLFVBQUFPLFlBQVksRUFBSTtBQUMzQ0QsU0FBTyxDQUFDSixTQUFSLENBQW1CLE1BQW5CLEVBQ0dDLElBREgsQ0FDU0ksWUFBWSxDQUFDSCxRQUR0QixFQUVHQyxLQUZILEdBR0doQixNQUhILENBR1csTUFIWCxFQUlHQyxJQUpILENBSVMsTUFKVCxFQUlpQixNQUpqQixFQUtHQSxJQUxILENBS1MsUUFMVCxFQUttQixNQUxuQixFQU1HQSxJQU5ILENBTVMsR0FOVCxFQU1jUSxPQU5kO0FBT0QsQ0FSRCxFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiaW1wb3J0IHN0eWxlIGZyb20gJy4uL2Fzc2V0cy9zdHlsZXNoZWV0cy9pbmRleC5zY3NzJ1xuaW1wb3J0IG1hcCBmcm9tICcuL21hcCc7IiwiIC8vV2lkdGggYW5kIGhlaWdodCBvZiBtYXBcbiB2YXIgd2lkdGggPSA5NjA7XG4gdmFyIGhlaWdodCA9IDUwMDtcbiBcbiAvLyBjcmVhdGUgc3ZnXG4gdmFyIHN2ZyA9IGQzLnNlbGVjdCggXCJib2R5XCIgKVxuICAgICAuYXBwZW5kKCBcInN2Z1wiIClcbiAgICAgLmF0dHIoIFwid2lkdGhcIiwgd2lkdGggKVxuICAgICAuYXR0ciggXCJoZWlnaHRcIiwgaGVpZ2h0ICk7XG4gXG4gLy8gQXBwZW5kIGVtcHR5IHBsYWNlaG9sZGVyIGcgZWxlbWVudCB0byB0aGUgU1ZHXG4gLy8gZyB3aWxsIGNvbnRhaW4gZ2VvbWV0cnkgZWxlbWVudHNcbiB2YXIgZyA9IHN2Zy5hcHBlbmQoIFwiZ1wiICk7XG4gXG4gLy8gRDMgUHJvamVjdGlvblxuIHZhciBhbGJlcnNQcm9qZWN0aW9uPSBkMy5nZW9BbGJlcnMoKVxuICAgICAuc2NhbGUoIDE5MDAwMCApXG4gICAgIC5yb3RhdGUoIFs3MS4wNTcsMF0gKVxuICAgICAuY2VudGVyKCBbMCwgNDIuMzEzXSApXG4gICAgIC50cmFuc2xhdGUoIFt3aWR0aC8yLGhlaWdodC8yXSApO1xuIFxuICAgICAgICAgXG4gLy8gQ3JlYXRlIEdlb1BhdGggZnVuY3Rpb24gdGhhdCB1c2VzIGJ1aWx0LWluIEQzIGZ1bmN0aW9uYWxpdHkgdG8gdHVyblxuIC8vIGxhdC9sb24gY29vcmRpbmF0ZXMgaW50byBzY3JlZW4gY29vcmRpbmF0ZXNcbiB2YXIgZ2VvUGF0aCA9IGQzLmdlb1BhdGgoKVxuICAgICAucHJvamVjdGlvbiggYWxiZXJzUHJvamVjdGlvbiApO1xuICAgICAgICAgXG4gLy8gQ2xhc3NpYyBEMy4uLiBTZWxlY3Qgbm9uLWV4aXN0ZW50IGVsZW1lbnRzLCBiaW5kIHRoZSBkYXRhLCBhcHBlbmQgdGhlIGVsZW1lbnRzLCBhbmQgYXBwbHkgYXR0cmlidXRlc1xuIGQzLmpzb24oXCJkYXRhL3VzLmpzb25cIiwgdXNfanNvbiA9PiB7XG4gICBnLnNlbGVjdEFsbCggXCJwYXRoXCIgKVxuICAgICAgIC5kYXRhKCB1c19qc29uLmZlYXR1cmVzICkgLy8gaXMgdGhpcyByaWdodD8gXG4gICAgICAgLmVudGVyKClcbiAgICAgICAuYXBwZW5kKCBcInBhdGhcIiApXG4gICAgICAgLmF0dHIoIFwiZmlsbFwiLCBcIiNjY2NcIiApXG4gICAgICAgLmF0dHIoIFwic3Ryb2tlXCIsIFwiIzMzM1wiKVxuICAgICAgIC5hdHRyKCBcImRcIiwgZ2VvUGF0aCApO1xuIH0pXG4gXG4gXG4gICAvLyBNYXAgc2Nob29sc1xuICAgdmFyIHNjaG9vbHMgPSBzdmcuYXBwZW5kKFwiZ1wiKTtcbiAgIGQzLmpzb24oXCJkYXRhL3NjaG9vbHMuanNvblwiLCBzY2hvb2xzX2pzb24gPT4ge1xuICAgICBzY2hvb2xzLnNlbGVjdEFsbCggXCJwYXRoXCIgKVxuICAgICAgIC5kYXRhKCBzY2hvb2xzX2pzb24uZmVhdHVyZXMgKVxuICAgICAgIC5lbnRlcigpXG4gICAgICAgLmFwcGVuZCggXCJwYXRoXCIgKVxuICAgICAgIC5hdHRyKCBcImZpbGxcIiwgXCIjOTAwXCIgKVxuICAgICAgIC5hdHRyKCBcInN0cm9rZVwiLCBcIiM5OTlcIiApXG4gICAgICAgLmF0dHIoIFwiZFwiLCBnZW9QYXRoICk7XG4gICB9KSJdLCJzb3VyY2VSb290IjoiIn0=