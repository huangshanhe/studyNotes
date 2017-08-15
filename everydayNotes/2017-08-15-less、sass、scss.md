# less、sass、scss #

- less
                Less一种动态样式语言. 将CSS赋予了动态语言的特性，如变量，继承，运算， 函数.
                LESS 既可以在客户端上运行 (支持IE 6+, Webkit, Firefox)，也可一在服务端运行 
                (借助 Node.js)。less英文站需要翻墙，也可以访问中文站
                
- sass/scss

                Sass (Syntactically Awesome Stylesheets)是一种动态样式语言，
                Sass语法属于缩排语法，比css比多出好些功能(如变量、嵌套、运算,混入(Mixin)、继承、颜色处理，函数等)，更容易阅读。
                
Sass与Scss是什么关系?
                
                Sass的缩排语法，对于写惯css前端的web开发者来说很不直观，也不能将css代码加入到Sass里面，
                因此sass语法进行了改良，Sass 3就变成了Scss(sassy css)。与原来的语法兼容，只是用{}取代了原来的缩进。
                Less也是一种动态样式语言. 对CSS赋予了动态语言的特性，如变量，继承，运算， 函数. 
                Less 既可以在客户端上运行 (支持IE 6+, Webkit, Firefox)，也可在服务端运行 (借助 Node.js)。

## 二. Sass/Scss与Less区别 ##

- 1.编译环境不一样

                Sass的安装需要Ruby环境，是在服务端处理的，而Less是需要引入less.js来处理Less代码输出css到浏览器，也可以在开发环节使用Less，然后编译成css文件，直接放到项目中，也有 Less.app、SimpleLess、CodeKit.app这样的工具，也有在线编译地址。

- 2.变量符不一样，Less是@，而Scss是$，而且变量的作用域也不一样。
                
                复制代码
                Less-作用域
                @color: #00c; /* 蓝色 */
                #header {
                  @color: #c00; /* red */
                  border: 1px solid @color; /* 红色边框 */
                }

                #footer {
                  border: 1px solid @color; /* 蓝色边框 */
                }

                Less-作用域编译后
                #header{border:1px solid #cc0000;}
                #footer{border:1px solid #0000cc;}

                scss-作用域
                $color: #00c; /* 蓝色 */

                #header {

                  $color: #c00; /* red */
                  border: 1px solid $color; /* 红色边框 */
                }

                #footer {
                  border: 1px solid $color; /* 蓝色边框 */
                }

                Sass-作用域编译后

                #header{border:1px solid #c00}
                #footer{border:1px solid #c00}

                我们可以看出来，less和scss中的变量会随着作用域的变化而不一样。
                复制代码


- 3.输出设置，Less没有输出设置，Sass提供4中输出选项：nested, compact, compressed 和 expanded。

                输出样式的风格可以有四种选择，默认为nested

                nested：嵌套缩进的css代码
                expanded：展开的多行css代码
                compact：简洁格式的css代码
                compressed：压缩后的css代码
                
- 4.Sass支持条件语句，可以使用if{}else{},for{}循环等等。而Less不支持。

                复制代码
                /* Sample Sass “if” statement */

                @if lightness($color) > 30% {

                } @else {

                }

                /* Sample Sass “for” loop */

                @for $i from 1 to 10 {
                  .border-#{$i} {
                    border: #{$i}px solid blue;
                  }
                }
                
- 5. 引用外部CSS文件

                scss引用的外部文件命名必须以_开头, 如下例所示:其中_test1.scss、_test2.scss、_test3.scss文件分别设置的h1 h2 h3。文件名如果以下划线_开头的话，Sass会认为该文件是一个引用文件，不会将其编译为css文件.

                复制代码

                // 源代码：
                @import "_test1.scss";
                @import "_test2.scss";
                @import "_test3.scss";

                // 编译后：
                h1 {
                  font-size: 17px;
                }

                h2 {
                  font-size: 17px;
                }

                h3 {
                  font-size: 17px;
                }

                复制代码
                Less引用外部文件和css中的@import没什么差异。

- 6.Sass和Less的工具库不同

                Sass有工具库Compass, 简单说，Sass和Compass的关系有点像Javascript和jQuery的关系,
                Compass是Sass的工具库。在它的基础上，封装了一系列有用的模块和模板，补充强化了Sass的功能。

                Less有UI组件库Bootstrap,Bootstrap是web前端开发中一个比较有名的前端UI组件库，
                Bootstrap的样式文件部分源码就是采用Less语法编写。
