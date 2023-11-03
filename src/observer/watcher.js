// @ts-nocheck
import { Dep } from './dep'

/**
 * vue Vue的实例
 * exp 字符串
 * cb  回调
 */
class Watcher {
  constructor(vue, exp, cb) {
    // 绑定到 Watcher 类身上
    this.vm = vue
    this.exp = exp
    this.cb = cb

    // 在类上面添加一个属性 WatcherValue
    this.WatcherValue = this.WatcherGet()
  }
  // ! 1、Watcher 和数据关联 -- 通过在Watcher中调用数据实现
  // 当 Watcher 被调用时 会调用它的成员方法 调用回调
  update(newValue) {
    this.cb && this.cb(newValue)
  }
  WatcherGet() {
    // 传送带
    Dep.target = this

    let value
    // 要收集的依懒数据
    const obj = this.vm.proxy_data
    // 要收集的项
    value = obj[this.exp]
    Dep.target = null

    return value
  }
}

export { Watcher }
