# prototype和constructor详解 #

-首先prototype:原型 　　 constructor:构造器
- function定义的对象有一个prototype属性，使用new生成的对象就没有这个prototype属性。

                function Person(name)  
                {  
                   this.name=name;  
                   this.showMe=function()  
                        {  
                           alert(this.name);  
                        }  
                };  

                var one=new Person('js');  

                alert(one.prototype)//undefined------new生成的对象就没有这个prototype属性。
                alert(typeof Person.prototype);//object  
                alert(Person.prototype.constructor);//function Person(name) {...}; 
                //prototype属性又指向了一个prototype对象，注意prototype属性与prototype对象是两个不同的东西，要注意区别。在prototype对象中又有一个                   constructor属性，这个constructor属性同样指向一个constructor对象，而这个constructor对象恰恰就是这个function函数本身。
