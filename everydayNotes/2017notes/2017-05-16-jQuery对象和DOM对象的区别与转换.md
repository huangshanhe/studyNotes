# 2017-05-16-jQuery对象和DOM对象的区别与相互转换 #

## 1.jQuery对象和DOM对象的区别 ##

DOM对象，即是我们用传统的方法(javascript)获得的对象，jQuery对象即是用jQuery类库的选择器获得的对象;

	eg:
	
	var domObj = document.getElementById("id"); //DOM对象
	var $obj = $("#id"); //jQuery对象;

jQuery对象就是通过jQuery包装DOM对象后产生的对象，它是jQuery独有的。如果一个对象是jQuery对象，那么就可以使用jQuery里的方法，例:
$("#foo").html(); //获取id为foo的元素内的html代码，html()是jQuery特有的方法;
上面的那段代码等同于:

	document.getElementById("foo").innerHTML;

注意：在jQuery对象中无法使用DOM对象的任何方法。
例如$("#id").innerHTML 和$("#id").checked之类的写法都是错误的，可以用$("#id").html()和$("#id").attr ("checked")之类的 jQuery方法来代替。同样，DOM对象也不能使用jQuery方法。

## 2.jQuery对象和DOM对象的互相转换 ##

### 1)jquery对象转换成 dom对象 var cr = $("#cr")[0];###
jquery提供了两种方法将一个jquery对象转换成一个dom对象，即[index]和get(index)。可能有人会觉得奇怪，怎么是用下标呢，没错，jquery对象就是一个数组对象.
下面代码将演示一个jquery对象转换成dom对象，再使用dom对象的方法

	eg:
	var $cr=$("#cr"); //jquery对象
	var cr = $cr[0]; //dom对象 也可写成 var cr=$cr.get(0);
	alert(cr.checked); //检测这个checkbox是否给选中

### 2）dom对象转换成jquery对象 $cr = $(document.getElementById("cr"))###

对于一个dom对象，只需要用$()把dom对象包装起来，就可以获得一个jquery对象了，方法为$(dom对象);
复制代码 代码如下:

	var cr=document.getElementById("cr"); //dom对象
	var $cr = $(cr); //转换成jquery对象

（注意：转换后可以任意使用jquery中的方法了.）

建议:

平时用到的jquery对象都是通过$()函数制造出来的，$()函数就是一个jquery对象的制造工厂.

如果获取的对象是 jquery对象，那么在变量前面加上$,这样方便容易识别出哪些是jquery对象,例如:
var $variable = jquery对象;
如果获取的是dom对象，则定义如下:
var variable = dom对象
