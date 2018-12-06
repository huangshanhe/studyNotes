# setInterval() 和 clearInterval() #

setInterval()是一种定时器，它按照指定的设置时间（以毫秒计）来调用函数的方法。

clearInterval()是结束定时器的循环调用函数。除非调用clearInterval()方法，否则无限循环执行回调函数。例如：

        var i = 0;//定义一个变量i
        var t = setInterval(function(){
            if(i === 60){
                clearInterval(t);//假如i是60，则清除此定时器，结束循环回调
            }else{
                i++;
                console.log(i);
            }
        },1000);//设置每1000毫秒（一秒钟）回调一次函数


setTimeout()同理也是一种定时器，对应的结束定时的方法是clearTimeout()。

与setInterval()不同的是，此定时器只执行一次，例如：

        var t = setTimeout(function(){
            console.log("OK");
        },1000);//一秒后在控制台输出字符串"OK"
