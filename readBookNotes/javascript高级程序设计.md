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

- NaN not a number isNaN()
- 数值转换 Number() parseInt() parseFloat()

		var num1 = parseInt("AF", 16); //175第二个参数按照多少进制转换
		var num2 = parseInt("AF"); //NaN 
		alert(!!"blue"); //true
		alert(!!0); //false
		alert(!!NaN); //false
		alert(!!""); //false
		alert(!!12345); //true 
		
- 条件操作符 ? variable = boolean_expression ? true_value : false_value;   boolean_expression为true则值为true_value否则反之。

- for-in语句 遍历对象

		var obj = {a:1,
			   b:2,
			   c:3};
		for(var i in obj){
		    alert(i);//a,b,c
		    alert(obj[i]);//1,2,3
		}

- switch 语句 case 里可以是任何数据类型甚至是表达式

		var num = 25;
		switch (true) {
			 case num < 0:
				 alert("Less than 0.");
				 break;
			 case num >= 0 && num <= 10:
				 alert("Between 0 and 10.");
				 break;
			 case num > 10 && num <= 20:
				 alert("Between 10 and 20.");
				 break;
			 default:
			 alert("More than 20.");
		}
		
- 验证参数arguments个数

		function howManyArgs() {
		 alert(arguments.length);
		}
		howManyArgs("string", 45); //2
		howManyArgs(); //0
		howManyArgs(12); //1
		
		function doAdd() {
		 if(arguments.length == 1) {
		 	alert(arguments[0] + 10);
		 } else if (arguments.length == 2) {
		 	alert(arguments[0] + arguments[1]);
		 }
		}
		doAdd(10); //20
		doAdd(30, 20); //50 
		
- 没有重载，也无法实现，总被第二次覆盖

		function addSomeNumber(num){
		 return num + 100;
		}
		function addSomeNumber(num) {
		 return num + 200;
		}
		var result = addSomeNumber(100); //300 
