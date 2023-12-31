import { Dep } from './dep.js'
/** 定义observer 类 */

/**
 * 实现响应式的方法
 * @param {*} obj 实现相应式的数据
 * @param {*} key 实现相应式的数据的属性
 * @param {*} val 相当于闭包的一个参数
 * @param {*} cb 数据更新调用的回调函数
 */
function defineReactive(obj, key, val, cb) {
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    get: () => {
      console.log('defineReactive get => 获取数据', val)
      //  收集依赖
      dep.depend()

      return val
    },
    set: (value) => {
      console.log('defineReactive set => 更新数据', value)
      val = value
      // 通知依懒 (触发依懒的更新)
      dep.notify(value) 

      cb ? cb(value) : null
    },
  })
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
      enumerable: false,
    })
    // 因为 Observer 与 Dep 是关联的 所以在实例化Observer是要 new一个Dep
    const dep = new Dep()

    // 调用类的方法成员，遍历数据 实现响应式
    this.walk(value, cb)
  }
  walk(value, cb) {
    Object.keys(value).forEach((key) => {
      defineReactive(value, key, value[key], cb)
    })
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
  let ob
  // 判断 如果数据有“__ob__”这个属性，则不添加
  if (typeof value.__ob__ !== 'undefined') {
    ob = value.__ob__
  } else {
    // 判断 如果数据没有“__ob__”这个属性，则添加上
    ob = new Observer(value, cb)
  }
  return ob
}

export { observe, Observer }
