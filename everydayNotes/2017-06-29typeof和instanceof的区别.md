## typeof和instanceof的区别 ##

- typeof是什么?typeof 是一个操作符,主要的目的是检测一个变量是不是基本数据类型的变量,同时也可以说是确定一个变量是字符串,数值,布尔值,还是undefined
的最佳工具。

typeof 示例代码

        [javascript] view plain copy
        var a="zhangqian";  
        var b=true;  
        var c=10;  
        var d;  
        var e=null;  
        var f=new Object();  
  
        alert(typeof a); //string  
        alert(typeof b); //number  
        alert(typeof c); //boolean  
        alert(typeof d); //undefined  
        alert(typeof e); //object  
        alert(typeof f); //object  
        
- typeof应该注意的问题?
   使用typeof操作符的时候,如果检测对象是函数,那么操作符返回"function" ,如果检测对象是正则表达式的时候,在Safari和Chrome中使用typeof的时候会错误的返回"function",
其他的浏览器返回的是object.
instanceof是什么?
    instanceof主要的目的是检测引用类型,判断对象是Array,还是RegExp!
instanceof示例代码?
   
        [javascript] view plain copy
        var array=new Array();  
        var object=new Object();  
        var regexp=new RegExp();  
        function func(){};  
        var func1=new func();  

        alert(array instanceof Array);  //true  
        alert(object instanceof Object);  //true  
        alert(regexp instanceof RegExp);  //true  
        alert(func1 instanceof func);  //true  
        
instanceof应该注意的问题?
    大家都知道Object是所有对象的基类,所以在alert(array instanceof Object) 返回的结果同样也是true,还有就是instanceof的语法一定不要写错了 variable instanceof constructor !
typeof  和instanceof的联系
     其实typeof和instanceof的目的都是检测变量的类型,两个的区别在于typeof一般是检测的是基本数据类型,instanceof主要检测的是引用类型!


