# var $this = $(this) #

在很多地方，我们都会看到 
var $this = $(this)的代码，那它到底是什么意思，有什么用呢？

this其实是一个html 元素。 
$this 只是个变量名，加$是为说明其是个jquery对象。 
而$(this)是个转换，将this表示的dom对象转为jquery对象，这样就可以使用jquery提供的方法操作。

作用：把当前对象保存起来，便于后边的使用。
