(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function Vue(options) {
    this.name = options.name;
    this.age = options.age;
    window.alert('实例化');
  }

  return Vue;

}));
//# sourceMappingURL=vue.js.map
