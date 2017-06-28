## javaScript面向对象编程 ##

- javaScript不是传统的面向对象语言，而是一套独特的原型系统。
- 面向对象编程（Object Oriented Programming，OOP，面向对象程序设计）是一种计算机编程架构
- 字符串与数字转换偷懒 number+"" 或者 string乘以1
- NaN不等于任何东西包括他自己,NaN == NaN //false
- 五大基本数据类型: number string boolean null undefined 任何不属于基本数据类型的东西都是对象
- 六种falsy值 ："" null undefine NaN false 0  //truthy
- 数组是 object 可以存任何数据类型 包括数组
- delete只会把array[1]设置为undefined，长度不变，我们也能用 var a="asdd"  //a[1]="s"  string[i]来访问字符串
- 代码块: {} 可以无限嵌套 {{{}}}
- 用if( typeof someval !=="undefined"){}替代if(someval){}
- 用 var a = b? 1 : 2;  //这里的?三无运算符
