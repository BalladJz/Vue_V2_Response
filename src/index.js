import { observe } from './observer/index'
import { Watcher } from './observer/watcher.js'

/**
 * 代理Vue中的数据，通过实例可直接访问 vm.XXX 或 this.XXX
 * @param {*} data 要代理的数据
 */
function _proxy(data) {
  // 遍历需要代理的数据
  Object.keys(data).forEach((key) => {
    // 通过 Object.defineProperty() 方法给每一个数据实现可以通过 vm.XXX 或 this.XXX 可以获取和设置
    Object.defineProperty(this, key, {
      get() {
        console.log('_proxy get => 获取代理')
        return this.proxy_data[key]
      },
      set(value) {
        console.log('_proxy set => 设置代理')
        this.proxy_data[key] = value
      },
    })
  })
}

function Vue(options) {
  // const vm = this
  this.$options = options

  // 代理options.data  options.data可能是函数，也可能是一个对象
  this.proxy_data = typeof options.data === 'function' ? options.data() : options.data
  // 实现数据的响应式（双向绑定） 传入需要实现响应式的数据
  observe(this.proxy_data)
  // 代理的方法
  // ! .call(this, 
  _proxy.call(this, this.proxy_data)

  // this表示Vue的 实例
  new Watcher(this, 'a', (newValue) => {
    console.log('a发生改变', newValue)
  })
}

// // $watch方法的实现
// Vue.prototype.$watch = function (key, cb) {
//   // 实现watch 并执行回调
//   const vm = this
//   new Watcher(vm, key, cb)
// }

export default Vue
