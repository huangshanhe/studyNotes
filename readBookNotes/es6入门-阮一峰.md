# es6入门 #

- let 命令

    不存在变量提升
    不允许重复声明 § ⇧
    let不允许在相同作用域内，重复声明同一个变量。
    var命令会发生”变量提升“现象，即变量可以在声明之前使用，值为undefined。
    这种现象多多少少是有些奇怪的，按照一般的逻辑，变量应该在声明语句之后才可以使用。
    为了纠正这种现象，let命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。
    总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。

- 块级作用域

    使得块级作用域可以变为表达式，也就是说可以返回值，办法就是在块级作用域之前加上do，使它变为do表达式。
    let x = do {
      let t = f();
      t * t + 1;
    };
    上面代码中，变量x会得到整个块级作用域的返回值。

- const 命令

    const声明一个只读的常量。一旦声明，常量的值就不能改变。
    const PI = 3.1415;
    const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。
    
- 顶层对象的属性

let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。也就是说，从ES6开始，全局变量将逐步与顶层对象的属性脱钩。
顶层对象，在浏览器环境指的是window对象，在Node指的是global对象。ES5之中，顶层对象的属性与全局变量是等价的。

- global 对象

    在语言标准的层面，引入global作为顶层对象。也就是说，在所有环境下，global都是存在的，都可以从它拿到顶层对象。

    垫片库system.global模拟了这个提案，可以在所有环境拿到global。

    // CommonJS的写法
    require('system.global/shim')();

    // ES6模块的写法
    import shim from 'system.global/shim'; shim();
    上面代码可以保证各种环境里面，global对象都是存在的。

    // CommonJS的写法
    var global = require('system.global')();

    // ES6模块的写法
    import getGlobal from 'system.global';
    const global = getGlobal();
    上面代码将顶层对象放入变量global。

