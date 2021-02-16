/*!
 * dasta.js v1.1.0
 * (c) 2020- YogurtCat
 * git: https://github.com/YogurtCat2020/dasta
 * Released under the MIT License.
 */
module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/CodeH.ts":
/*!**********************!*\
  !*** ./src/CodeH.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const lib_1 = __webpack_require__(/*! @yogurtcat/lib */ "@yogurtcat/lib");
class CodeH extends lib_1.Code {
    constructor(args) {
        const { template, T, codes, name, N, attrs, A, children, C, ...rem } = lib_1.sugar(args, {
            template: 'T',
            name: 'N',
            attrs: 'A',
            children: 'C'
        });
        const t = [`@`];
        const c = [name];
        if (!lib_1.is.un(attrs)) {
            t.push(`@`);
            c.push(attrs);
        }
        if (!lib_1.is.un(children)) {
            t.push(`@`);
            c.push(children);
        }
        super(lib_1.Code.new({
            template: `h(${t.join(', ')})`,
            codes: c,
            ...rem
        }).$);
    }
}
exports.default = CodeH;
lib_1.Code.extension.set('H', x => new CodeH(x));


/***/ }),

/***/ "./src/Component.ts":
/*!**************************!*\
  !*** ./src/Component.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const lib_1 = __webpack_require__(/*! @yogurtcat/lib */ "@yogurtcat/lib");
class Component extends lib_1.Container {
    constructor(args) {
        super();
        this.container = lib_1.Mass.new(args);
        this.allow = true;
    }
    relocate(key) {
        return [this.container, key];
    }
    merge(args) {
        this.container.merge(args);
        return this;
    }
    get $() {
        if (!this.allow)
            return null;
        this.allow = false;
        const context = this.$context;
        const contextName = this.$contextName;
        const props = this.$props;
        const data = this.$data(context, contextName);
        const render = this.$render(context, contextName);
        const r = {};
        if (!lib_1.is.un(props))
            r['props'] = props;
        if (!lib_1.is.un(data))
            r['data'] = data;
        for (let [k, v] of this.container)
            if (lib_1.to.bool(v))
                r[k] = lib_1.to.obj(v);
        if (!lib_1.is.un(render))
            r['render'] = render;
        return r;
    }
    get $context() {
        const context = this.container.take('context');
        return lib_1.to.obj(context);
    }
    get $contextName() {
        const contextName = this.container.take('contextName');
        return lib_1.to.obj(contextName);
    }
    get $props() {
        const props = this.container.take('props');
        if (!lib_1.to.bool(props))
            return null;
        const r = {};
        for (let [k, v] of props) {
            v = lib_1.to.obj(v);
            if (!lib_1.is.arr(v))
                v = [v];
            if (v.length <= 0)
                v = {
                    type: null,
                    required: true,
                };
            else if (v.length == 1) {
                const [v0] = v;
                if (lib_1.is.type(v0))
                    v = {
                        type: v0,
                        required: true,
                    };
                else
                    v = {
                        type: lib_1.to.type(v0),
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
    $data(context, contextName) {
        const obj = this.container.take('data');
        return Component.funcData(obj, context, contextName);
    }
    $render(context, contextName) {
        const obj = this.container.take('render');
        return Component.funcRender(obj, context, contextName);
    }
    decor(...args) {
        return super.decor(...args);
    }
    static regData(obj) {
        obj = lib_1.to.obj(obj);
        if (!lib_1.to.bool(obj))
            return null;
        if (!['init', 'I', 'opr', 'O']
            .map(i => lib_1.to.bool(obj[i]))
            .reduce((s, c) => s || c, false))
            return null;
        return obj;
    }
    static funcData(obj, context, contextName) {
        obj = this.regData(obj);
        if (lib_1.is.un(obj))
            return null;
        return lib_1.evaluate({
            template: `(function(){return @})`,
            codes: [obj]
        }, context, contextName);
    }
    static codeData(obj) {
        obj = this.regData(obj);
        if (lib_1.is.un(obj))
            return null;
        return lib_1.Code.new({
            template: `(function(){return @})`,
            codes: [obj]
        }).$;
    }
    static regRender(obj) {
        obj = lib_1.to.obj(obj);
        if (!lib_1.to.bool(obj))
            return null;
        if (!['name', 'N']
            .map(i => lib_1.to.bool(obj[i]))
            .reduce((s, c) => s || c, false))
            return null;
        return obj;
    }
    static funcRender(obj, context, contextName) {
        obj = this.regRender(obj);
        if (lib_1.is.un(obj))
            return null;
        return lib_1.evaluate({
            template: `(function(h){return @})`,
            codes: [obj]
        }, context, contextName);
    }
    static codeRender(obj) {
        obj = this.regRender(obj);
        if (lib_1.is.un(obj))
            return null;
        return lib_1.Code.new({
            template: `(function(h){return @})`,
            codes: [obj]
        }).$;
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
const CodeH_1 = __webpack_require__(/*! ./CodeH */ "./src/CodeH.ts");
exports.CodeH = CodeH_1.default;
const Component_1 = __webpack_require__(/*! ./Component */ "./src/Component.ts");
exports.Component = Component_1.default;


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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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