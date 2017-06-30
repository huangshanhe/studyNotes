# prototype和constructor详解附带原型链 #

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
                //prototype属性又指向了一个prototype对象，注意prototype属性与prototype对象是两个不同的东西，要注意区别。
                在prototype对象中又有一个constructor属性，这个constructor属性同样指向一个constructor对象，
                而这个constructor对象恰恰就是这个function函数本身。
                
                你只要记住只有函数才有prototype属性,这个属性值为一个object对象实例对象时没有这个属性的，
                实例对象通过__proto__这个内部属性（[[prototype]]）来串起一个原型链的，通过这个原型链可以查找属性，
                方法通过new操作符初始化一个函数对象的时候就会构建出一个实例对象，
                函数对象的prototype属性指向的对象就是这个实例对象的原型对象，也就是__proto__指向的对象
                
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

-new分为三步

                var one=new Person('js');
                var one={};  
                Person.call(one,'js');
                
