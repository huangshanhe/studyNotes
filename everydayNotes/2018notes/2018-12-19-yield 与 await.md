# Generator/yield与 async await #

- nodejs 的 co模块

        co 函数库是著名程序员 TJ Holowaychuk 于2013年6月发布的一个小工具，用于 Generator 函数的自动执行。
        co 函数库其实就是将两种自动执行器（Thunk 函数和 Promise 对象），包装成一个库。
        使用 co 的前提条件是，Generator 函数的 yield 命令后面，只能是 Thunk 函数或 Promise 对象。
        
        Thunk函数等价于柯里化：        
        thunk函数具备以下两个要素： 
        1. 有且只有一个参数是callback的函数； 
        2. callback的第一个参数是error。 
        使用thunk函数，同时结合co我们就可以像写同步代码那样来写书写异步代码

- async和await其实就是Generator的语法糖。

        Generator在形式上和函数差不多，只是在function和函数名之间多了一个*。Generator内部必须使用yield关键字。

        让这个Generator执行起来，所以我们需要一个执行器。co就是一个执行器，让Generator自动执行。
        co有个限制，yield语句后面跟的只能是Promise对象或者Thunk函数，关于co更详细的介绍，
        可以参考阮老师的文章co 函数库的含义和用法。然而这样的方法依然需要依赖外在的库函数，
        
        于是ES6中提出了async和await关键字。async和await其实就是Generator的语法糖。只是它自带执行器。
