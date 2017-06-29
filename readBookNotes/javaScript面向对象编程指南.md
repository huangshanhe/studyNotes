# javaScript面向对象编程指南 #

## 基础 ##
- javaScript不是传统的面向对象语言，而是一套独特的原型系统。
- 面向对象编程（Object Oriented Programming，OOP，面向对象程序设计）是一种计算机编程架构
- 字符串与数字转换偷懒 number+"" 或者 string乘以1
- NaN不等于任何东西包括他自己,NaN == NaN //false
- 五大基本数据类型: number string boolean null undefined 任何不属于基本数据类型的东西都是对象
- 六种falsy值 ："" null undefine NaN false 0  //truthy
- 数组是 object 可以存任何数据类型 包括数组
- delete只会把array[1]设置为undefined，长度不变，我们也能用 var a="asdd"  //a[1]="s"  string[i]来访问字符串
- 代码块: {} 可以无限嵌套 {{{}}}
- 用if( typeof(someval) !=="undefined"){}替代if(someval){} 如果someval未声明或者声明了未赋值，直接报错!但是如果 someval是NaN会进不去，所以我认为
if(typeof(someval) !=="undefined"&&someval){}会更好，具体进不进if看需求
- 用 var a = b? 1 : 2;  //这里的?三无运算符
- 用switch代替n个else if  贯穿就是故意省略 break; 一般不使用
- while(先条件再执行)和 do-while(先执行再条件) 如果 i直接赋值为11  while不执行 而 do-while 执行一次后 i=12 一般不用
- parseInt(val,几进制(10、16))  parseFloat  转换失败返回 NaN
- 一次性任务 自调用  {function a (){}}()
- 数组和对象很像，无非是对象是{} key 可以自定义，数组是自然数。
    
                var o = {name:'aa'};
                var o = {"name":'aa'};
                var o = {'name':'aa'};
        
        以上三者是一样的
        但是如果Key是特殊字符，必须加''否则报错
        
                var o = {'!@#$%&&':true,
                         'yes or no':false
                         };

- 访问对象的属性可以用点.也可以用[]推荐使用[key]/['key'][]里加''不推荐
- 声明一个构造函数的时候记得new 否则this指向全局对象，会报undefined
-typeof 测试数据基本类型 instanceof测试一个对象是不是由一个构造函数所创建的
-call 和 apply区别就是传参: parent.call(son,parameter); 父函数把所有属性和方法都继承给子函数

                function Animal(name)
                    {
                        this.name=name;
                        this.showName=function()
                        {
                            alert(this.name)
                        }
                    }
                  function Cat(name)
                    {
                        Animal.call(this,name); //将Animal应用到Cat上，因此Cat拥有了Animal的所有属性和方法
                    }
                var cat = new Cat('huangsh');
                cat.showName(); //浏览器弹出 huangsh
- string indexOf('条件',从哪开始)第一次出现的索引位置 toLowerCase() toUpperCase()//去重排序见下

                    var arr = [1,3,4,5,6,7,4,3,2,4,5,6,7,3,2];
                    function find(arr){
                        var newArr = [];
                        for (var i = 0; i < arr.length; i++) {
                            if (newArr.indexOf(arr[i]) === -1 ) {//如果没找到返回-1，放进去，找到就不放进去了
                                newArr.push(arr[i]);
                            }
                        }
                        newArr.sort(function(a,b){//排序
                            return a>b;
                        })
                        console.log(newArr);
                    }
                    find(arr);
                    
- Math.random() Math.E Math.PI等等 Date 正则表达式RegExp(regular expression)

## 原型 ##

- hasOwnProperty('') propertyIsEnumberable 判断是否可以枚举
- 在添加相关方法和属性的时候提前检测一下是否有该方法 if(!String.prototype.reverse){}
- BOM是Browser Object Model的缩写，简称浏览器对象模型
- DOM 文档对象模型（Document Object Model，简称DOM）
