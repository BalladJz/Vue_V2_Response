(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  // @ts-nocheck

  class Dep {
    constructor() {
      this.subs = [];
    }
    // 成员方法
    addSubs(watcher) {
      this.subs.push(watcher);
      console.log('Dep类 addSubs => 添加依懒 了吗？', this.subs);
    }
    depend() {
      if (Dep.target) {
        this.addSubs(Dep.target);
      }
      console.log('Dep类 depend =>  收集依懒');
    }
    notify(newValue) {
      //  深拷贝
      const subs = this.subs.slice();
      // 通知
      subs.forEach(v => v.update(newValue));
      console.log('Dep类 depend =>  通知依懒');
    }
  }

  /** 定义observer 类 */

  /**
   * 实现响应式的方法
   * @param {*} obj 实现相应式的数据
   * @param {*} key 实现相应式的数据的属性
   * @param {*} val 相当于闭包的一个参数
   * @param {*} cb 数据更新调用的回调函数
   */
  function defineReactive(obj, key, val, cb) {
    const dep = new Dep();
    Object.defineProperty(obj, key, {
      get: () => {
        console.log('defineReactive get => 获取数据', val);
        //  收集依赖
        dep.depend();
        return val;
      },
      set: value => {
        console.log('defineReactive set => 更新数据', value);
        val = value;
        // 通知依懒 (触发依懒的更新)
        dep.notify(value);
        cb ? cb(value) : null;
      }
    });
  }

  /**
   *  通过类
   *  1、添加响应式标志
   *  2、实现响应式
   */
  class Observer {
    constructor(value, cb) {
      //  给数据添加'__ob__'属性，且可以精确设置它能够被枚举，重写等
      Object.defineProperty(value, '__ob__', {
        // this表示 observe类 
        value: this,
        enumerable: false
      });
      // 因为 Observer 与 Dep 是关联的 所以在实例化Observer是要 new一个Dep
      new Dep();

      // 调用类的方法成员，遍历数据 实现响应式
      this.walk(value, cb);
    }
    walk(value, cb) {
      Object.keys(value).forEach(key => {
        defineReactive(value, key, value[key], cb);
      });
    }
  }

  /**
   * 实现数据的响应式（双向绑定）
   * @param {*} value 传入需要实现响应式的数据
   * @param {*} cb 数据更新调用的回调函数
   * @returns
   */
  function observe(value, cb = undefined) {
    // 声明一个ob 用来标记数据是否是响应式的
    let ob;
    // 判断 如果数据有“__ob__”这个属性，则不添加
    if (typeof value.__ob__ !== 'undefined') {
      ob = value.__ob__;
    } else {
      // 判断 如果数据没有“__ob__”这个属性，则添加上
      ob = new Observer(value, cb);
    }
    return ob;
  }

  // @ts-nocheck

  /**
   * vue Vue的实例
   * exp 字符串
   * cb  回调
   */
  class Watcher {
    constructor(vue, exp, cb) {
      // 绑定到 Watcher 类身上
      this.vm = vue;
      this.exp = exp;
      this.cb = cb;

      // 在类上面添加一个属性 WatcherValue
      this.WatcherValue = this.WatcherGet();
    }
    // ! 1、Watcher 和数据关联 -- 通过在Watcher中调用数据实现
    // 当 Watcher 被调用时 会调用它的成员方法 调用回调
    update(newValue) {
      this.cb && this.cb(newValue);
    }
    WatcherGet() {
      // 传送带
      Dep.target = this;
      let value;
      // 要收集的依懒数据
      const obj = this.vm.proxy_data;
      // 要收集的项
      value = obj[this.exp];
      Dep.target = null;
      return value;
    }
  }

  /**
   * 代理Vue中的数据，通过实例可直接访问 vm.XXX 或 this.XXX
   * @param {*} data 要代理的数据
   */
  function _proxy(data) {
    // 遍历需要代理的数据
    Object.keys(data).forEach(key => {
      // 通过 Object.defineProperty() 方法给每一个数据实现可以通过 vm.XXX 或 this.XXX 可以获取和设置
      Object.defineProperty(this, key, {
        get() {
          console.log('_proxy get => 获取代理');
          return this.proxy_data[key];
        },
        set(value) {
          console.log('_proxy set => 设置代理');
          this.proxy_data[key] = value;
        }
      });
    });
  }
  function Vue(options) {
    // const vm = this
    this.$options = options;

    // 代理options.data  options.data可能是函数，也可能是一个对象
    this.proxy_data = typeof options.data === 'function' ? options.data() : options.data;
    // 实现数据的响应式（双向绑定） 传入需要实现响应式的数据
    observe(this.proxy_data);
    // 代理的方法
    // ! .call(this, 
    _proxy.call(this, this.proxy_data);

    // this表示Vue的 实例
    new Watcher(this, 'a', newValue => {
      console.log('a发生改变', newValue);
    });
  }

  return Vue;

}));
//# sourceMappingURL=vue.js.map
