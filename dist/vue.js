(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function Vue(options) {
    // // const vm = this
    this.$options = options;

    // 代理options.data
    // options.data可能是函数，也可能是一个对象
    this._data = typeof options.data === 'function' ? options.data() : options.data;

    // 实现数据的响应式（双向绑定）
    // Object.keys(this._data).forEach((key) => {
    //   let val = undefined
    //   let cb = undefined
    //   Object.defineProperty(this._data, key, {
    //     get() {
    //       console.log('get => 获取数据', val)
    //       return val
    //     },
    //     set(value) {
    //       console.log('set => 更新数据', value)
    //       val = value
    //       cb ? cb(val) : null
    //     },
    //   })
    // })
    observe(this._data);

    // 定义 代理的方法
    // 将Vue实例上的操作，代理到Vue._data上
    // Object.keys(this._data).forEach((key) => {
    //   Object.defineProperty(this, key, {
    //     get() {
    //       return this._data[key]
    //     },
    //     set(value) {
    //       this._data[key] = value
    //     },
    //   })
    // })

    _proxy.call(this, this._data);
  }

  // 定义代理的方法
  function _proxy(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          return this._data[key];
        },
        set(value) {
          this._data[key] = value;
        }
      });
    });
  }

  // 定义响应式数据
  function observe(value, cb) {
    Object.keys(value).forEach(key => {
      defineReactive(value, key, value[key], cb);
    });
  }
  function defineReactive(obj, key, val, cb) {
    Object.defineProperty(obj, key, {
      get: () => {
        console.log('get => 获取数据', val);
        return val;
      },
      set: value => {
        console.log('set => 更新数据', value);
        val = value;
        cb ? cb(value) : null;
      }
    });
  }

  return Vue;

}));
//# sourceMappingURL=vue.js.map
