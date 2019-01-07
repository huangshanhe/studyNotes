# mini-css-extract-plugin #

- 将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件，支持按需加载css和sourceMap
- 只能用在webpack4中，对比另一个插件 extract-text-webpack-plugin有点:

        异步加载
        不重复编译，性能更好
        更容易使用
        只针对CSS

        目前缺失功能，HMR。

- sourceMap 

        SourceMap 一个存储源代码与编译代码对应位置映射的信息文件

        在前端的工作中主要是用来解决以下三个方面出现的 debug 问题：

        a. 代码压缩混淆后
        b. 利用 sass 、typeScript 等其他语言编译成 css 或 JS 后
        c. 利用 webpack 等打包工具进行多文件合并后

        上面三种情况，我们在调试时都是没办法像调试源码般轻松，
        这就需要 SourceMap 帮助我们在控制台中转换成源码，从而进行 debug 。
