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

1. **+声明+**

		   var message; //message为undefine
		   var message = "hi";
		   message = 100; // 有效但不推荐

1. **基本数据类型：Undefined、Null、Boolean、Number、String,复杂数据类型:object**
 
		用typeof 判断类型

1. **构造函数 constructor hasOwnProperty**

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

# **作用域和内存问题** #

- 变量值可以被复制，指向同一个对象

		var obj1 = new Object();
		var obj2 = obj1;
		obj1.name = "Nicholas";
		alert(obj2.name); //"Nicholas" 
	
- 检测类型 typeof instanceof

- 没有块级作用域

		if (true) {
		 var color = "blue";
		}
		alert(color); //"blue" 
	
- 栈方法 LIFO(Last-In-First-Out，后进先出) push() pop() shift() unshift()

		push()//推入并返回整个数组
		pop()//取得数组最后一项并返回移除最后一项后的数组
		shift()//取得数组第一项并返回移除第一项后的数组
		unshift()//取得数组第一项并返回增加第一项后的数组

		concat()//创建副本并返回新增后的整个数组
		var colors = ["red", "green", "blue"];
		var colors2 = colors.concat("yellow", ["black", "brown"]);
		alert(colors); //red,green,blue
		alert(colors2); //red,green,blue,yellow,black,brown 

		slice(1,4)//返回数组1-4的值，不改变原数组
		splice//(下标,几项,插入)
		removed = colors.splice(1, 0, "yellow", "orange"); //从第一项开始插入两项

		reverse()֖//反过来 
		sort()//排序，但是

		function compare(value1, value2) {
		 if (value1 < value2) {
		 return -1;
		 } else if (value1 > value2) {
		 return 1;
		 } else {
		 return 0;
		 }
		}

		var values = [0, 1, 5, 10, 15];
		values.sort(compare);
		alert(values); //0,1,5,10,15 
	
- 位置方法indexOf()、lastIndexOf()。//分别是从头开始和末尾开始第一次出现的位置--可以是数组或者字符串

# **面向对象** #
	
		Object.defineProperty()//访问器属性--设置后严格模式下报错，非严格模式下什么也不发生
			Configurable//能否用delete
			Enumerable//能否枚举 for-in
			get//读
			set//写
			writeable//读写
			value//指定的值

- 工厂模式
- 构造函数模式
- 原型模式
- 组合使用构造函数和原型模式
- 动态原型模式
- 寄生构造函数模式
- 稳妥构造函数模式

- 原型链
		
		其实，只需要明白原型对象的结构即可：

		    Function.prototype = {
			constructor : Function,
			__proto__ : parent prototype,
			some prototype properties: ...
		    };

		函数的原型对象constructor默认指向函数本身，原型对象除了有原型属性外，
		为了实现继承，还有一个原型链指针_proto_，该指针指向上一层的原型对象，
		而上一层的原型对象的结构依然类似，这样利用_proto_一直指向Object的原型对象上
		，而Object的原型对象用Object._proto_ = null表示原型链的最顶端，
		如此变形成了javascript的原型链继承，同时也解释了为什么所有的javascript对象都具有Object的基本方法。
		
		
- 借用构造函数
- 组合继承
- 原型式继承
- 寄生式继承
- 寄生组合式继承//最常用最好

		function inheritPrototype(subType, superType){
			 var prototype = Object.create(superType.prototype); //创建对象
			 //这里 Object.create(superType.prototype)和object(superType.prototype)一样
			 prototype.constructor = subType; //增强对象
			 subType.prototype = prototype; //指定对象
		}
	
		function SuperType(name){
		 this.name = name;
		 this.colors = ["red", "blue", "green"];
		}
		SuperType.prototype.sayName = function(){
		 alert(this.name);
		};
		function SubType(name, age){
		 SuperType.call(this, name);

		 this.age = age;
		}
		inheritPrototype(SubType, SuperType);
		SubType.prototype.sayAge = function(){
		 alert(this.age);
		};
		
		1. 创建超类型原型的副本。
		2. 为创建的副本添加constructor属性，弥补因重写原型而失去的默认的constructor属性
		3. 将新创建的对象（即副本）赋值给子类型的原型这种方法只调用了一次SuperType构造函数，
		instanceof 和isPrototypeOf()也能正常使用。
