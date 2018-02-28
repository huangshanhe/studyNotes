# hasOwnProperty与isPrototypeOf的区别 #

- 利用hasOwnProperty判断是否有自己的属性或对象(继承来的返回false)

                var o =new Object();
                o.prop="exists";
                o.hasOwnProperty("prop");//true 自身的属性
                o.hasOwnProperty("toString");//false 继承自Object原型上的方法
                o.hasOwnProperty("hasOwnProperty");//false 继承自Object原型上的方法
                Object.prototype.hasOwnProperty('toString');//true 本体
                Object.prototype.hasOwnProperty('hasOwnProperty');//true 本体
                
                function A(){};
                A.prototype.hasOwnProperty('constructor');//true;
                var a = nwe A(); //prototype:原型  constructor 构造器  propetry属性
                a.prototye;// undefined ------new出来的函数没有prototype属性               
                a.constructor.prototype.hasOwnProperty('constructor');//其实a.constructor === A;//true

- 利用isPropertyOf()检查一个对象是否存在一另一个对象的原型链上

                var o={};
                function Person(){};
                var p1 =new Person();//继承自原来的原型，但是现在已经无法访问
                Person.prototype=o;
                var p2 =new Person();//继承自o
                console.log(o.isPrototypeOf(p1));//false o是不是p1的原型
                console.log(o.isPrototypeof(p2));//true o是不是p2的原型
                console.log(Object.prototype.isPrototypeOf(p1));//true
                console.log(Object.prototype.isPrototypeOf(p2));//true
                
- 总结

                1.hasOwnProperty：是用来判断一个对象是否有你给出名称的属性或对象。
                不过需要注意的是，此方法无法检查该对象的原型链中是否具有该属性，该属性必须是对象本身的一个成员。
                
                2.isPrototypeOf是用来判断要检查其原型链的对象是否存在于指定对象实例中，是则返回true，否则返回false。
