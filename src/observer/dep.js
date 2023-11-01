class Dep {
    constructor() {
        this.subs = []
    }
    // 成员方法
    addSubs() {
        console.log('Dep类 addSubs => 添加依懒')
    }
    depend() {
        console.log('Dep类 depend =>  收集依懒')
    }
    notify() {
        console.log('Dep类 depend =>  通知依懒')
    }
}

export {Dep}