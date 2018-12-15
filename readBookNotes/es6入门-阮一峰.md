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

- 变量的解构赋值

        数组的解构赋值
        对象的解构赋值
        字符串的解构赋值
        数值和布尔值的解构赋值
        函数参数的解构赋值
        圆括号问题
        用途
        
        （1）交换变量的值

        let x = 1;
        let y = 2;

        [x, y] = [y, x];
        上面代码交换变量x和y的值，这样的写法不仅简洁，而且易读，语义非常清晰。

        （2）从函数返回多个值

        函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便。

        // 返回一个数组

        function example() {
          return [1, 2, 3];
        }
        let [a, b, c] = example();

        // 返回一个对象

        function example() {
          return {
            foo: 1,
            bar: 2
          };
        }
        let { foo, bar } = example();
        
        （4）提取JSON数据

        解构赋值对提取JSON对象中的数据，尤其有用。

        let jsonData = {
          id: 42,
          status: "OK",
          data: [867, 5309]
        };

        let { id, status, data: number } = jsonData;

        console.log(id, status, number);
        // 42, "OK", [867, 5309]

- 各种扩展

        字符串的扩展
        正则的扩展
        数值的扩展
        数组的扩展
        函数的扩展
        对象的扩展
        
- Symbol

        ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。
        它是 JavaScript 语言的第七种数据类型，前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。

        Symbol 值通过Symbol函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型
        。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

- 箭头函数

                没有参数: 如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。  var f = () => 5;
                一个参数: let f = v => v;
                多个参数: var f = (a,b) => a+b;
                返回对象：由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号。
                         var getTempItem = id => ({ id: id, name: "Temp" });

                下面是 rest 参数与箭头函数结合的例子。
                const numbers = (...nums) => nums;
                numbers(1, 2, 3, 4, 5)
                // [1,2,3,4,5]
                const headAndTail = (head, ...tail) => [head, tail];
                headAndTail(1, 2, 3, 4, 5)
                // [1,[2,3,4,5]]

                使用注意点
                箭头函数有几个使用注意点。

                （1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。

                （2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

                （3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

                （4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

                上面四点中，第一点尤其值得注意。this对象的指向是可变的，但是在箭头函数中，它是固定的。
                
## promise ##

                Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。
                它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象。

                所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
                从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

                Promise对象有以下两个特点。

                （1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：
                Pending（进行中）、Fulfilled（已成功）和Rejected（已失败）。只有异步操作的结果，
                可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

                （2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能
                ：从Pending变为Fulfiled和从Pending变为Rejected。只要这两种情况发生，状态就凝固了，不会再变了，
                会一直保持这个结果，这时就称为 Resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数
                ，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

                注意，为了行文方便，本章后面的 Resolved 统一只指 Fulfilled 状态，不包含 Rejected 状态。

                
                Promise.prototype.catch()
                Promise.prototype.catch()
                 一般来说，不要在then方法里面定义Reject状态的回调函数（即then的第二个参数），总是使用catch方法。

                // bad
                promise
                  .then(function(data) {
                    // success
                  }, function(err) {
                    // error
                  });

                // good
                promise
                  .then(function(data) { //cb
                    // success
                  })
                  .catch(function(err) {
                    // error
                  });
                上面代码中，第二种写法要好于第一种写法，理由是第二种写法可以捕获前面then方法执行中的错误，
                也更接近同步的写法（try/catch）。因此，建议总是使用catch方法，而不使用then方法的第二个参数。

- 模块加载 详情见笔记里的import和require

                默认情况下，浏览器是同步加载 JavaScript 脚本，即渲染引擎遇到<script>标签就会停下来，
                等到执行完脚本，再继续向下渲染。如果是外部脚本，还必须加入脚本下载的时间。

                如果脚本体积很大，下载和执行的时间就会很长，因此造成浏览器堵塞，用户会感觉到浏览器“卡死”了，
                没有任何响应。这显然是很不好的体验，所以浏览器允许脚本异步加载，下面就是两种异步加载的语法。
                <script src="path/to/myModule.js" defer></script>
                <script src="path/to/myModule.js" async></script>
                上面代码中，<script>标签打开defer或async属性，脚本就会异步加载。渲染引擎遇到这一行命令，
                就会开始下载外部脚本，但不会等它下载和执行，而是直接执行后面的命令。
                defer与async的区别是：defer要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），
                才会执行；async一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。一句话，defer是“渲染完再执行”，
                async是“下载完就执行”。另外，如果有多个defer脚本，会按照它们在页面出现的顺序加载，而多个async脚本是不能保证加载顺序的。

- 浏览器加载 ES6 模块，也使用<script>标签，但是要加入type="module"属性。也可以用async  默认和defer一样渲染完再执行。

                <script type="module" src="./foo.js"></script>
                
                利用顶层的this等于undefined这个语法点，可以侦测当前代码是否在 ES6 模块之中。
                const isNotModuleScript = this !== undefined;
                
                讨论 Node 加载 ES6 模块之前，必须了解 ES6 模块与 CommonJS 模块完全不同。

                它们有两个重大差异。

                CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
                CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
                
                ES6 不缓存 活的
                CommonJS 缓存 死的，除非用函数返回
                
                node加载 只有import命令才可以加载.mjs文件
                
                CommonJS 模块的输出都定义在module.exports这个属性上面。
                Node 的import命令加载 CommonJS 模块，Node 会自动将module.exports属性，
                当作模块的默认输出，即等同于export default xxx。

                下面是一个 CommonJS 模块。

                // a.js
                module.exports = {
                  foo: 'hello',
                  bar: 'world'
                };

                // 等同于
                export default {
                  foo: 'hello',
                  bar: 'world'
                };
                
                CommonJS 模块加载 ES6 模块，不能使用require命令，而要使用import()函数。ES6 模块的所有输出接口，会成为输入对象的属性。

- CommonJS 循环加载

                CommonJS 模块加载 ES6 模块，不能使用require命令，而要使用import()函数。ES6 模块的所有输出接口，会成为输入对象的属性。
                总之，CommonJS 输入的是被输出值的拷贝，不是引用。

                另外，由于 CommonJS 模块遇到循环加载时，返回的是当前已经执行的部分的值，而不是代码全部执行后的值，
                两者可能会有差异。所以，输入变量的时候，必须非常小心。

                var a = require('a'); // 安全的写法
                var foo = require('a').foo; // 危险的写法

                exports.good = function (arg) {
                  return a.foo('good', arg); // 使用的是 a.foo 的最新值
                };

                exports.bad = function (arg) {
                  return foo('bad', arg); // 使用的是一个部分加载时的值
                };
                上面代码中，如果发生循环加载，require('a').foo的值很可能后面会被改写，改用require('a')会更保险一点。

- es6 循环加载    

                解决这个问题的方法，就是让b.mjs运行的时候，foo已经有定义了。这可以通过将foo写成函数来解决。

                // a.mjs
                import {bar} from './b';
                console.log('a.mjs');
                console.log(bar());
                function foo() { return 'foo' }
                export {foo};

                // b.mjs
                import {foo} from './a';
                console.log('b.mjs');
                console.log(foo());
                function bar() { return 'bar' }
                export {bar};

                这是因为函数具有提升作用，在执行import {bar} from './b'时，函数foo就已经有定义了，
                所以b.mjs加载的时候不会报错。这也意味着，如果把函数foo改写成函数表达式，也会报错。

                // a.mjs
                import {bar} from './b';
                console.log('a.mjs');
                console.log(bar());
                const foo = () => 'foo';
                export {foo};
                上面代码的第四行，改成了函数表达式，就不具有提升作用，执行就会报错。


                
# ...(扩展运算符)和assign()以及拷贝 #

- Object.assign() 只是一级属性复制，比浅拷贝多深拷贝了一层而已。用的时候，还是要注意这个问题的。

- 扩展运算符的解构赋值

        let { x, y, ...z } = null; // 运行时错误
        let { x, y, ...z } = undefined; // 运行时错误
        解构赋值必须是最后一个参数，否则会报错。

        let { ...x, y, z } = obj; // 句法错误
        let { x, ...y, ...z } = obj; // 句法错误
        上面代码中，解构赋值不是最后一个参数，所以会报错。

- 扩展运算符的拷贝

        注意，解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值拷贝的是这个值的引用，而不是这个值的副本。

        let obj = { a: { b: 1 } };
        let { ...x } = obj;
        obj.a.b = 2;
        x.a.b // 2
        上面代码中，x是解构赋值所在的对象，拷贝了对象obj的a属性。a属性引用了一个对象，修改这个对象的值，会影响到解构赋值对它的引用。
        
        
        扩展运算符(...)用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。
        let z = {a:3,b:4};
        let n = {...z};
        n //{a:3,b:4}}

        这等同于使用Object.assign方法
        let aClone = {...a};
        //等同于
        let aClone = Object.assign({},a);

        
