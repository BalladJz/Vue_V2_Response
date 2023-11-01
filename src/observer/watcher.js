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
    }
    // 当 Watcher 被调用时 会调用它的成员方法 调用回调
    update() {

    }
}

export { Watcher }