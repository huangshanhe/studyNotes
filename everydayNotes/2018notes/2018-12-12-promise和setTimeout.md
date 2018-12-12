# setTimeout和Promise区别（宏任务和微任务） #

        setTimeout(function() {
            console.log(1)
        }, 0);
        new Promise(function(a, b) {
            console.log(2);
            for(var i = 0; i < 10; i++) {
                i == 9 && a();
            }
            console.log(3);
        }).then(function() {
            console.log(4)
        });
        console.log(5)
        
        结果是 2 3 5 4 1
        
- 最需要 解释的是：then和settimeout执行顺序，即setTimeout(fn, 0)在下一轮“事件循环”开始时执行，
- Promise.then()在本轮“事件循环”结束时执行。因此then 函数先输出，settimeout后输出。

- 1.javascript的宏任务和微任务

宏任务有Event Table、Event Queue，微任务有Event Queue

- 1.宏任务：包括整体代码script，setTimeout，setInterval；

- 2.微任务：Promise，process.nextTick

注：Promise立即执行，then函数分发到微任务Event Queue，process.nextTick分发到微任务Event Queue

- 任务进入执行栈----同步任务还是异步任务----同步的进入主线程，异步的进入Event Table并注册函数。
- 当指定的事情完成时，Event Table会将这个函数移入Event Queue。主线程内的任务执行完毕为空，
- 会去Event Queue读取对应的函数，进入主线程执行。上述过程会不断重复，也就是常说的Event Loop(事件循环)。

        setTimeout(function() {
            console.log('宏任务setTimeout');  //先遇到setTimeout，将其回调函数注册后分发到宏任务Event Queue
          //如果setTimeout设置时间，那它会先把函数放到宏任务Event Table,等时间到了再放入宏任务Event Queue里面
        })
        new Promise(function(resolve) {
            console.log('微任务promise');  	//new Promise函数立即执行
            resolve();						//必须resolve执行才能执行then
        }).then(function() {
            console.log('微任务then');  		  //then函数分发到微任务Event Queue
        })
        console.log('主线程console');

        //执行顺序结果： 微任务promise、主线程console、微任务then、宏任务setTimeout

- 3.事件循环，宏任务，微任务的关系如图所示：

![事件循环，宏任务，微任务的关系](https://img-blog.csdn.net/20181010000854394?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMwMzc2Mzc1/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

          console.log('1主线程');					//整体script作为第一个宏任务进入主线程
          setTimeout(function() {				//setTimeout，其回调函数被分发到宏任务Event Queue（执行规则：从上到下排序，先进先执行）中
              console.log('2宏任务');
              process.nextTick(function() {
                  console.log('3宏任务里面的微任务');
              })
              new Promise(function(resolve) {
                  console.log('4微任务');
                  resolve();
              }).then(function() {
                  console.log('5微任务')
              })
          })
          process.nextTick(function() {	//process.nextTick()其回调函数被分发到微任务Event Queue中
              console.log('6微任务');
          })
          new Promise(function(resolve) {		//Promise，new Promise直接执行，输出7
              console.log('7微任务');
              resolve();
          }).then(function() {
              console.log('8微任务')			//then被分发到微任务Event Queue中,排在process.nextTick微任务后面。
          })
          setTimeout(function() {			//setTimeout，其回调函数被分发到宏任务Event Queue中,排在前面的setTimeout后面
              console.log('9宏任务');
              process.nextTick(function() {
                  console.log('10宏任务里面的微任务');
              })
              new Promise(function(resolve) {
                  console.log('11微任务');
                  resolve();
              }).then(function() {
                  console.log('12微任务')
              })
          })

          //执行结果： 1主线程、7微任务、6微任务、8微任务、2宏任务、4微任务、3宏任务里面的微任务、5微任务、
          //          9宏任务、11微任务、10宏任务里面的微任务、12微任务


        setTimeout(function(){console.log(1)},0);
        
        new Promise(function(resolve,reject){
           console.log(2);
           setTimeout(function(){resolve()},0)
        }).then(function(){console.log(3)
        }).then(function(){console.log(4)});

        process.nextTick(function(){console.log(5)});

        console.log(6);

        //输出的是  2 6 5 1 3 4

        setTimeout(function () {
          console.log(3);
        }, 0);

        Promise.resolve().then(function () {
          console.log(2);
        });
        console.log(1);
        //输出为  1  2 3
## process.nextTick与Promise().then ##

        process.nextTick(function(){
            console.log(7);
        });

        new Promise(function(resolve){
            console.log(3);
            resolve();
            console.log(4);
        }).then(function(){
            console.log(5);
        });

        process.nextTick(function(){
            console.log(8);
        });
        这段代码运行结果是3，4，7，8，5
        
        process.nextTick 永远大于 promise.then，原因其实很简单。。。在Node中，_tickCallback在每一次执行完TaskQueue中的一个任务后被调用，而         这个_tickCallback中实质上干了两件事：

        1.nextTickQueue中所有任务执行掉(长度最大1e4，Node版本v6.9.1)

        2.第一步执行完后执行_runMicrotasks函数，执行microtask中的部分(promise.then注册的回调)

        所以很明显 process.nextTick > promise.then
        
  # 最后总结：按照从上到下的顺序宏任务(promise()=console('js主线程')>setTimeout=setInterval(下一轮事件开始))>微任务(process.nextTick > promise.then) #
