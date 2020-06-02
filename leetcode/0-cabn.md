# 0-cabn #

## call ##

        Function.prototype.myCall = function(context) {
           context = context ? Object(context) : window
           context.fn = this
           let args = [...arguments].slice(1)
           let r = context.fn(args)
           delete context.fn
           return r
        }

## apply ##

        Function.prototype.myApply = function(context) {
          context = context ? Object(context) : window
            context.fn = this
            let args = [...arguments][1]
            if (!args) {
                return context.fn()
            }
            let r = context.fn(args)
            delete context.fn;
            return r
         }

## bind ##

        Function.prototype.bind = function(context) {
            if(typeof this !== 'function'){
               throw new Error(`${this.name} is not a function`)
            }
            let _me = this
            let bindArgs = [].slice.call(arguments, 1)
            function Fn() {}
            let fBound = function() {
                let fnArgs = [].slice.call(arguments)
                return _me.apply(this instanceof fBound ? this : context, bindArgs.concat(fnArgs))
            }
            Fn.prototype = this.prototype
            fBound.prototype = new Fn();
            return fBound
        }

## 防抖节流 ##

- 函数节流：不断触发一个函数后，执行第一次，只有大于设定的执行周期后才会执行第二次

        // 方法一：定时器实现
        const throttle = function(fn,delay) {
          let timer = null
          return function() {
            const context = this
            let args = arguments
            if(!timer) {
              timer = setTimeout(() => {
                fn.apply(context,args) 
                clearTimeout(timer) 
                timer = null;
              },delay)
            }
          }
        }

        // 方法二：时间戳
        const throttle2 = function(fn, delay) {
          let preTime = Date.now()

          return function() {
              const context = this
              let args = arguments
              let doTime = Date.now()
              if (doTime - preTime >= delay) {
                  fn.apply(context, args)
                  preTime = Date.now()
              }
          }
        }

- 函数防抖：不断触发一个函数，在规定时间内只让最后一次生效，前面都不生效

        function debounce(fn, delay) {
            let timer;
            return function() {
                let context = this;
                let args = arguments;
                clearTimeout(timer);
                timer = setTimeout(function() {
                    fn.apply(context, args);
                }, delay);
            };
        }

## new ##

        function Animal(type) {
            this.type = type;
        }
        Animal.prototype.say = function() {
            console.log('say')
        }

        function _new(fn,...args){   // ...args为ES6展开符,也可以使用arguments
            //先用Object创建一个空的对象,
            const obj = Object.create(fn.prototype)  //fn.prototype代表 用当前对象的原型去创建
            
            //现在obj就代表Dog了,但是参数和this指向没有修改
            const res = fn.apply(obj,args)
            
            //正常规定,如何fn返回的是null或undefined(也就是不返回内容),我们返回的是obj,否则返回rel
            return res instanceof Object ? res : obj
        }
        let animal = mockNew(Animal, 'dog')

        console.log(animal.type) // dog
        animal.say() // say
