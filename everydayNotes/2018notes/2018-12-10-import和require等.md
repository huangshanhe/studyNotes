# import和require以及import() export export default #

        历史上，JavaScript 一直没有模块（module）体系，无法将一个大程序拆分成互相依赖的小文件，
        再用简单的方法拼装起来。其他语言都有这项功能，比如 Ruby 的require、Python 的import，
        甚至就连 CSS 都有@import，但是 JavaScript 任何这方面的支持都没有，这对开发大型的、复杂的项目形成了巨大障碍。

- import   ES6模块 “编译时加载”或者静态加载，最好不要改变，只读来用，给方法赋值报错，改变对象的值不会报错

        注意，import命令具有提升效果，会提升到整个模块的头部，首先执行。

        foo();

        import { foo } from 'my_module';
        
        上面的代码不会报错，因为import的执行早于foo的调用。这种行为的本质是，import命令是编译阶段执行的，在代码运行之前。
        
        // ES6模块
        import { stat, exists, readFile } from 'fs';
        
        上面代码的实质是从fs模块加载 3 个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载，
        即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。

        由于 ES6 模块是编译时加载，使得静态分析成为可能。有了它，就能进一步拓宽 JavaScript 的语法，
        比如引入宏（macro）和类型检验（type system）这些只能靠静态分析实现的功能。

        除了静态加载带来的各种好处，ES6 模块还有以下好处。

        不再需要UMD模块格式了，将来服务器和浏览器都会支持 ES6 模块格式。
        目前，通过各种工具库，其实已经做到了这一点。
        将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者navigator对象的属性。
        不再需要对象作为命名空间（比如Math对象），未来这些功能可以通过模块提供。

- export & export default

        一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。
        如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量。
        
        function v1() { ... }
        function v2() { ... }

        export {
          v1 as streamV1,
          v2 as streamV2,
          v2 as streamLatestVersion
        };

        // 报错 1只是一个值，不是接口
        export 1;

        // 报错 应该要 { m }
        var m = 1;
        export m;

        正确写法
        // 写法一
        export var m = 1;

        // 写法二
        var m = 1;
        export {m};

        // 写法三
        var n = 1;
        export {n as m};
        
        另外，export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。


        export var foo = 'bar';
        setTimeout(() => foo = 'baz', 500);
        上面代码输出变量foo，值为bar，500 毫秒之后变成baz。
        
- export default

        // 第一组
        export default function crc32() { // 输出
          // ...
        }

        import crc32 from 'crc32'; // 输入

        // 第二组
        export function crc32() { // 输出
          // ...
        };

        import {crc32} from 'crc32'; // 输入
        上面代码的两组写法，第一组是使用export default时，对应的import语句不需要使用大括号；
        第二组是不使用export default时，对应的import语句需要使用大括号。

        // 正确
        export default 42;

        // 报错
        export 42;
        上面代码中，后一句报错是因为没有指定对外的接口，而前一句指定对外接口为default。

        如果想在一条import语句中，同时输入默认方法和其他接口，可以写成下面这样。

        import _, { each, forEach } from 'lodash';

- require    CommonJS模块-运行时加载

        // CommonJS模块
        let { stat, exists, readFile } = require('fs');

        // 等同于
        let _fs = require('fs');
        let stat = _fs.stat;
        let exists = _fs.exists;
        let readfile = _fs.readfile;
        
        上面代码的实质是整体加载fs模块（即加载fs的所有方法），生成一个对象（_fs），
        然后再从这个对象上面读取 3 个方法。这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。

- important() import()返回一个 Promise 对象。（1）按需加载。（2）条件加载（3）动态的模块路径

        import()类似于 Node 的require方法，区别主要是前者是异步加载，后者是同步加载。
        如果模块有default输出接口，可以用参数直接获得。

        import('./myModule.js')
        .then(myModule => {
          console.log(myModule.default);
        });
        上面的代码也可以使用具名输入的形式。

        import('./myModule.js')
        .then(({default: theDefault}) => {
          console.log(theDefault);
        });
        如果想同时加载多个模块，可以采用下面的写法。

        Promise.all([
          import('./module1.js'),
          import('./module2.js'),
          import('./module3.js'),
        ])
        .then(([module1, module2, module3]) => {
           ···
        });
