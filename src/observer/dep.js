// @ts-nocheck

class Dep {
  constructor() {
    this.subs = []
  }
  // 成员方法
  addSubs(watcher) {
    this.subs.push(watcher)
    console.log('Dep类 addSubs => 添加依懒 了吗？', this.subs)
  }
  depend() {
    if (Dep.target) {
      this.addSubs(Dep.target)
    }
    console.log('Dep类 depend =>  收集依懒')
  }
  notify(newValue) {
    //  深拷贝
    const subs = this.subs.slice()
    // 通知
    subs.forEach((v) => v.update(newValue))
    console.log('Dep类 depend =>  通知依懒')
  }
}

export { Dep }
