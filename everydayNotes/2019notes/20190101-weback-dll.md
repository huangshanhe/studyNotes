# webpack-dll #

- 什么是DllPlugin 和 DllReferencePlugin？作用是什么？

          在使用webpack进行打包时候，对于依赖的第三方库，比如vue，vuex等这些不会修改的依赖，
          我们可以让它和我们自己编写的代码分开打包，这样做的好处是每次更改我本地代码的文件的时候，
          webpack只需要打包我项目本身的文件代码，而不会再去编译第三方库，
          那么第三方库在第一次打包的时候只打包一次，以后只要我们不升级第三方包的时候，
          那么webpack就不会对这些库去打包，这样的可以快速的提高打包的速度。
          因此为了解决这个问题，DllPlugin 和 DllReferencePlugin插件就产生了。

        那么对于目前webpack社区来讲，我们希望和自己编写的代码分离开的话，webpack社区提供了2种方案：
        1. CommonsChunkPlugin
        2. DLLPlugin

        CommonsChunkPlugin 插件每次打包的时候还是会去处理一些第三方依赖库，
        只是它能把第三方库文件和我们的代码分开掉，生成一个独立的js文件。但是它还是不能提高打包的速度。

        DLLPlugin 它能把第三方库代码分离开，并且每次文件更改的时候，它只会打包该项目自身的代码。所以打包速度会更快。

        DLLPlugin 这个插件是在一个额外独立的webpack设置中创建一个只有dll的bundle，
        也就是说我们在项目根目录下除了有webpack.config.js，还会新建一个webpack.dll.config.js文件。
        webpack.dll.config.js作用是把所有的第三方库依赖打包到一个bundle的dll文件里面，还会生成一个名为 manifest.json文件。
        该manifest.json的作用是用来让 DllReferencePlugin 映射到相关的依赖上去的。

        DllReferencePlugin 这个插件是在webpack.config.js中使用的，
        该插件的作用是把刚刚在webpack.dll.config.js中打包生成的dll文件引用到需要的预编译的依赖上来。
        什么意思呢？就是说在webpack.dll.config.js中打包后比如会生成 vendor.dll.js文件和vendor-manifest.json文件，
        vendor.dll.js文件包含所有的第三方库文件，vendor-manifest.json文件会包含所有库代码的一个索引，
        当在使用webpack.config.js文件打包DllReferencePlugin插件的时候，
        会使用该DllReferencePlugin插件读取vendor-manifest.json文件，看看是否有该第三方库。
        vendor-manifest.json文件就是有一个第三方库的一个映射而已。

        所以说 第一次使用 webpack.dll.config.js 文件会对第三方库打包，打包完成后就不会再打包它了，
        然后每次运行 webpack.config.js文件的时候，都会打包项目中本身的文件代码，当需要使用第三方依赖的时候，
        会使用 DllReferencePlugin插件去读取第三方依赖库。所以说它的打包速度会得到一个很大的提升。
