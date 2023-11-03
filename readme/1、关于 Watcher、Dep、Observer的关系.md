关于 Watcher、Dep、Observer的关系



在Vue中调用 new Watcher ，传入 1、监听实例，2、实例的属性，3、监听后执行的回调

Watcher定义
1、在Watch内部依次将参数挂载在 类的实例身上 且因为数据的更新 需要Watcher进行收集，所以需要定义一个方法来获取到数据的更新
2、定义WatcherGet方法 并把整个类的实例挂载到Dep.target上（传送带）
3、定义update方法，如果有cb，则在外面调用update方法时掉用cb



Dep定义
1、在构造函数 constructor 上定义 subs 数组，用于存储收集到的watcher,一个subs就是一个 watcher
2、再分别定义Dep的成员方法
​	addSubs( ) { }: 用于存入watcher方法
​	depend( ) { }:  用于收集watcher的方法  => 获取数据时，会调用 observe 的 defineReactive 中的 get 方法，
                                           会再调用 dep.depend() 在Dep的depend中 判断Dep.target上是否有值，如果有值 就调用addSubs存入 subs 中
​	notify( ) { }:  用于在数据更新后通知DOM => 修改数据时，会调用 observe 的 defineReactive 方法 set 方法，
                                           会再调用 dep.notify() 在Dep的notify中 遍历subs，调用sub(一个watcher)的update方法 而在Watcher中会调用监听后的回调
3、...

三者关系的具体实现
第一步: 在Vue中 new Watcher时 调用Watcher的构造函数，并且把依赖 (target) 挂载到Dep中，此时 我们的Dep中已经有一个watcher了
第二步: 在获取vm实例的时候，会调用observe 方法，需要把observe和dep关联 需要new Dep， 在defineReactive（响应式）中，通过 let dep = new Dep
       在获取数据的时候 通过defineReactive中的 get 方法调用 depend( ) { } 收集 watcher 至 Dep中（在开始的时候就已经 监听了 这个依赖）
       在修改数据的时候 通过defineReactive中的 set 方法调用 notify( ) { } 去通知DOM更新