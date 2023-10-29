function Vue(options) {
  // // const vm = this
  this.$options = options

  // 代理options.data
  // options.data可能是函数，也可能是一个对象
  this._data =
    typeof options.data === 'function' ? options.data() : options.data
  
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

  _proxy.call(this, this._data)
}

function _proxy(data) {
  Object.keys(data).forEach((key) => {
    Object.defineProperty(this, key, {
      get() {
        return this._data[key]
      },
      set(value) {
        this._data[key] = value
      },
    })
  })
}

export default Vue
