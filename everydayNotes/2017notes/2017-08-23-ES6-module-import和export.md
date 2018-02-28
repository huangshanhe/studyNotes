# 相信很多人都使用过export、export default、import，然而它们到底有什么区别呢？ #

## ES6-module ##

                概述 § ⇧
                历史上，JavaScript 一直没有模块（module）体系，无法将一个大程序拆分成互相依赖的小文件，
                再用简单的方法拼装起来。其他语言都有这项功能，比如 Ruby 的require、Python 的import
                ，甚至就连 CSS 都有@import，但是 JavaScript 任何这方面的支持都没有，这对开发大型的、复杂的项目形成了巨大障碍。

                在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。
                前者用于服务器，后者用于浏览器。ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，
                完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。

                ES6 模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，
                以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。
                比如，CommonJS 模块就是对象，输入时必须查找对象属性。

                // CommonJS模块
                let { stat, exists, readFile } = require('fs');

                // 等同于
                let _fs = require('fs');
                let stat = _fs.stat;
                let exists = _fs.exists;
                let readfile = _fs.readfile;
                
                上面代码的实质是整体加载fs模块（即加载fs的所有方法），生成一个对象（_fs），
                然后再从这个对象上面读取3个方法。这种加载称为“运行时加载”，因为只有运行时
                才能得到这个对象，导致完全没办法在编译时做“静态优化”。

                ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。

                // ES6模块
                import { stat, exists, readFile } from 'fs';
                上面代码的实质是从fs模块加载3个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载，
                即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。
                当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。

                由于 ES6 模块是编译时加载，使得静态分析成为可能。有了它，
                就能进一步拓宽 JavaScript 的语法，比如引入宏（macro）
                和类型检验（type system）这些只能靠静态分析实现的功能。

                除了静态加载带来的各种好处，ES6 模块还有以下好处。

                不再需要UMD模块格式了，将来服务器和浏览器都会支持 ES6 模块格式。
                目前，通过各种工具库，其实已经做到了这一点。
                将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者navigator对象的属性。
                不再需要对象作为命名空间（比如Math对象），未来这些功能可以通过模块提供。

                - 在JavaScript ES6中，export与export default均可用于导出常量、函数、文件、模块等，
                你可以在其它文件或模块中通过import+(常量 | 函数 | 文件 | 模块)名的方式，将其导入，
                以便能够对其进行使用，但在一个文件或模块中，export、import可以有多个，export default仅有一个。 

- 关于大括号{}默认输出下面比较一下默认输出和正常输出。 
- 匿名函数和非匿名函数，export default匿名函数important的时候不用大括号，可以自定义命名,
- 而非匿名函数Important的时候要加{}且只能通过 oldNmae as newName 或者 *as newName 来自定义命名

- import和export命令只能在模块的顶层，不能在代码块之中（比如，在if代码块之中，或在函数之中）。
- import()函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。它是运行时执行，
也就是说，什么时候运行到这一句，也会加载指定的模块。另外，import()函数与所加载的模块
没有静态连接关系，这点也是与import语句不相同。
import()类似于 Node 的require方法，区别主要是前者是异步加载，后者是同步加载。

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

- 具体使用：

- 1、

                //demo1.js
                export const str = 'hello world'

                export function f(a){
                    return a+1
                }

                对应的导入方式：

                //demo2.js
                import { str, f } from 'demo1' //也可以分开写两次，导入的时候带花括号

- 2、

                //demo1.js
                export default const str = 'hello world'

                对应的导入方式：

                //demo2.js
                import str from 'demo1' //导入的时候没有花括号

- 3

                如果是 import * as getters from './getters';
                按 es6 的规范 import * as obj from "xxx" 会将 "xxx" 中
                所有 export 导出的内容组合成一个对象返回。n个export const合成

- 关于import 后缀.js 文件夹等

                浏览器在解析 import 语句时是需要后缀的，更确切地说，浏览器认 import 后面这个字符串为一个 URL 地址。这个和你在 CSS 文件里写 background-image: url(./path/to/a.jpg) 是一回事。浏览器会根据当前文件以及页面的 BaseURL 等相关信息，得出这个被依赖的资源的 URL 地址，进而向服务器发送 HTTP 请求。后缀在 HTTP 请求的 URL 地址中并不是那么重要，浏览器认的是 HTTP 响应头里的 Content-Type，只要托管你的 js 或图片的资源服务器能正确响应浏览器的 HTTP 请求，你可以随便定义后缀（当然，一般资源服务器会有一个从文件扩展名到 HTTP 响应头 MIMEType 的映射，你可以添加其他自定义后缀，使得服务器能正确响应，但是最好按约定的进行配置），甚至可以挂羊头卖狗肉，URL叫http://a.com/b.jpg 返回内容是响应头为
                application/javascript 的一段文本字符。

                打包工具
                打包工具的场景下，为了兼容性，js 中的 import 语句都会被翻译成用 ES5 实现的模块管理的导入语句，比如 webpack 的 __webpack_require__, 浏览器最后加载的是打包后的 bundle 文件，并没有执行 import 语句（大部分浏览器至今尚未实现import）。 这个时候，我们写的 import 后面到底要不要后缀，全凭工具自己定义规则啊，只要工具在编译打包时能找到被依赖模块。比如webpack可以设定先找 .ts 如果没有再找 .es 再找 .js, 如果是一个文件夹，就看文件夹里有没有 index.js，甚至从node_modules目录中去查找 ...

                总结：
                转译打包工具：不用写
                原生支持ES6的node：不用写
                原生支持ES6的浏览器：能通过URL在服务器上找到就行，如果真到了HTTP2盛行，ES6完全被浏览器实现，文件不用打包的时候，打包工具会有办法轻松处理的。
                总总结：别写
