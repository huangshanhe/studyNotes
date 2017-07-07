# You don't know javaScript #

## js入门与进阶 ##

- 两个内容相同的array == 是不同的

       var a = [1,2,3];
       var b = [1,2,3];
       a == b;//false
       
- NaN既不大于其他值，也不小于其他值，当然也不等于其他值

- 立即被调用的函数表达式 IIFE 在函数后面加()

- 老司机-用 void o 代替 undefined

        事实上，void的返回值都是undefined
        在ES5之前，window下的undefined是可以被重写的，于是导致了某些极端情况下使用undefined会出现一定的差错。
        所以，用void 0是为了防止undefined被重写而出现判断不准确的情况。
        除了防止被重写外，还可以减少字节。void 0代替undefined省3个字节。
        类似的还有很多常用的写法，看到别人这样写的时候就当是老司机的套路就行了。
        因为void 0永远返回undefined
        而undefined可以被重写，undefined其实是window的一个属性，可以给它赋值，这样undefined就不再是undefined了。
        
- 模拟"类"和"继承"，其实还是叫--行为委托吧

- ES6引入两种新的机制(也叫模式)promise和generator组合

## 作用域与闭包 ##

- IIFE 立即调用  可以是 var fn = function(){}(); 或者 (function fn(){})();
- 还有一种要在下面调用
  
                var foo = (function fn(){
                     function a(){console.log('a')};
                     function b(){console.log('b')};

                     return {
                         a:a,
                         b:b
                     };     
                })();

                foo.a();//a
                foo.b();//b
  
- 箭头函数或者用.bind(this)
  
## this与对象原型对 ##
  
- this是什么?不要依靠词法作用域，弄清楚this! 用 call  foo.call(foo,i);
- this不是在编译时绑定，而是在运行时绑定，和函数被声明的位置无关，和函数被调用的方式有关
- this依赖于函数调用的上下文条件,记录函数何处调用调用栈call-stack  我们要找函数的调用点 call-site
- 学习this是什么，首先要学会this不是什么，既不是函数自身的引用，也不是函数词法作用域的引用，而是函数被调用的调用点来决定

- 对象属性引用链的最后一层影响调用点

              function foo(){
                  console.log(this.a)
              }

              var obj1 = {
                  a:42,
                  foo:foo
              }

              var obj2 = {
                  a:2,
                  obj1:obj1
              }

              obj2.obj1.a//42

- 匿名函数:没有名称不能引用自己
