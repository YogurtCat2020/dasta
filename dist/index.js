/*!
 * dasta.js v1.0.22
 * (c) 2020- YogurtCat
 * git: https://github.com/YogurtCat2020/dasta
 * Released under the MIT License.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/CodeH.ts":
/*!**********************!*\
  !*** ./src/CodeH.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const lib_1 = __webpack_require__(/*! @yogurtcat/lib */ "@yogurtcat/lib");
const { is, sugar } = lib_1.base;
const { Code } = lib_1.code;
class CodeH extends Code {
    constructor(args) {
        const _a = sugar(args, {
            template: 'T',
            name: 'N',
            attrs: 'A',
            children: 'C'
        }), { template, T, codes, name, N, attrs, A, children, C } = _a, rem = __rest(_a, ["template", "T", "codes", "name", "N", "attrs", "A", "children", "C"]);
        const t = [`@`];
        const c = [name];
        if (!is.un(attrs)) {
            t.push(`@`);
            c.push(attrs);
        }
        if (!is.un(children)) {
            t.push(`@`);
            c.push(children);
        }
        super(Code.new(Object.assign({ template: `h(${t.join(', ')})`, codes: c }, rem)).code);
    }
}
exports.default = CodeH;
Code.extension.set('H', x => new CodeH(x));


/***/ }),

/***/ "./src/Component.ts":
/*!**************************!*\
  !*** ./src/Component.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const lib_1 = __webpack_require__(/*! @yogurtcat/lib */ "@yogurtcat/lib");
const { is, to } = lib_1.base;
const { Container, Mass } = lib_1.container;
class Component extends Container {
    constructor(args) {
        super();
        this.container = Mass.new(args);
        this.allow = true;
    }
    relocate(key) {
        return [this.container, key];
    }
    merge(args) {
        this.container.merge(args);
        return this;
    }
    get component() {
        if (!this.allow)
            return null;
        this.allow = false;
        const context = this.componentContext;
        const contextName = this.componentContextName;
        const props = this.componentProps;
        const data = this.componentData(context, contextName);
        const render = this.componentRender(context, contextName);
        const r = {};
        if (!is.un(props))
            r['props'] = props;
        if (!is.un(data))
            r['data'] = data;
        for (let [k, v] of this.container)
            if (to.bool(v))
                r[k] = to.obj(v);
        if (!is.un(render))
            r['render'] = render;
        return r;
    }
    get componentContext() {
        const context = this.container.take('context');
        return to.obj(context);
    }
    get componentContextName() {
        const contextName = this.container.take('contextName');
        return to.obj(contextName);
    }
    get componentProps() {
        const props = this.container.take('props');
        if (!to.bool(props))
            return null;
        const r = {};
        for (let [k, v] of props) {
            v = to.obj(v);
            if (!is.arr(v))
                v = [v];
            if (v.length <= 0)
                v = {
                    type: null,
                    required: true,
                };
            else if (v.length == 1) {
                const [v0] = v;
                if (is.type(v0))
                    v = {
                        type: v0,
                        required: true,
                    };
                else
                    v = {
                        type: to.type(v0),
                        default: v0,
                    };
            }
            else if (v.length == 2) {
                const [v0, v1] = v;
                v = {
                    type: v0,
                    default: v1,
                };
            }
            else {
                const [v0, v1, v2] = v;
                if (!v2)
                    v = {
                        validator: v0,
                        default: v1,
                    };
                else
                    v = {
                        validator: v0,
                        required: true,
                    };
            }
            r[k] = v;
        }
        return r;
    }
    componentData(context, contextName) {
        const data = this.container.take('data');
        if (!to.bool(data))
            return null;
        if (!['init', 'I', 'opr', 'O']
            .map(i => to.bool(data.get(i)))
            .reduce((s, c) => s || c, false))
            return null;
        return lib_1.evaluate({
            template: `(function(){return @})`,
            codes: [data]
        }, context, contextName);
    }
    componentRender(context, contextName) {
        const render = this.container.take('render');
        if (!to.bool(render))
            return null;
        if (!['name', 'N']
            .map(i => to.bool(render.get(i)))
            .reduce((s, c) => s || c, false))
            return null;
        return lib_1.evaluate({
            template: `(function(h){return @})`,
            codes: [render]
        }, context, contextName);
    }
    $(...args) {
        return super.$(...args);
    }
}
exports.default = Component;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Component = exports.CodeH = void 0;
var CodeH_1 = __webpack_require__(/*! ./CodeH */ "./src/CodeH.ts");
Object.defineProperty(exports, "CodeH", ({ enumerable: true, get: function () { return CodeH_1.default; } }));
var Component_1 = __webpack_require__(/*! ./Component */ "./src/Component.ts");
Object.defineProperty(exports, "Component", ({ enumerable: true, get: function () { return Component_1.default; } }));


/***/ }),

/***/ "@yogurtcat/lib":
/*!*********************************!*\
  !*** external "@yogurtcat/lib" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@yogurtcat/lib");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./src/index.ts");
/******/ })()
;
});