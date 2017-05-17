# javascript高级程序设计 #
## 　　　　　　　　Nicholas C. Zakas（尼古拉斯泽卡斯）  ###

1. **javaScript诞生于1995年**

1. **延迟脚本 (有async的不同步，可以异步)**

		<!DOCTYPE html>
		<html>
		 <head>
		 <title>Example HTML Page</title>
		 <script type="text/javascript" defer="defer" async src="example1.js"></script>
		 <script type="text/javascript" defer="defer" src="example2.js"></script>
		 </head>
		 <body>
		 </body>
		</html> 

1. **声明**

		   var message; //message为undefine
		   var message = "hi";
		   message = 100; // 有效但不推荐

1. **基本数据类型：Undefined、Null、Boolean、Number、String,复杂数据类型:object**
 
		用typeof 判断类型

1. **构造函数 constructor hasOwnPropety**

1. **条件操作符**

	variable = boolean_expression ? true_value : false_value;//
	var max = (num1 > num2) ? num1 : num2; //

1. **for循环**

	var count = 10;
	for (var i = 0; i < count; i++){//最好不要忽略 var i = 0;不要忽略var 
	 alert(i);
	} 

1. **switch语句**

		switch (expression) {
			 case value: 
				statement;
			 	break;
			 case value: 
				statement;
				 break;
			 case value: 
				statement;
			 	break;
			 case value: 
				statement;
				 break;
			 default: 
				statement;
				break;
		} 

1. **returny以后后面的永远都不执行**

		function diff(num1, num2) {
		 if (num1 < num2) {
		 return num2 - num1;
		 } else {
		 return num1 - num2;
		 }
		} 

1. 