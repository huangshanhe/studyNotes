# 避免滥用return false;与return;的区别 #

- retrun true； 返回正确的处理结果。
- return false；1.返回错误的处理结果；2.终止处理；阻止提交表单；3.阻止执行默认的行为。

                1•event.preventDefault();//阻止默认事件
                2•event.stopPropagation();//阻止冒泡
                3•停止回调函数执行并立即返回。

- return；把控制权返回给页面。只是3•停止回调函数执行并立即返回。

- 记住，只有当你真的明白你在做什么时，才使用”return false“，并确保
你是在函数的正确位置调用了相应的代码。最后，尽可能保持代码的灵活性，尽量不要再用“return false”了！

很多时候我们都想阻止一个a ?link的href跳转。

                <a onclick=”return false;” href=”www.360.cn”>click</a>
                以上代码可以达到这个效果

                有一点要注意

                function stop(){
                  return false;
                }

                <a onclick=”stop();” href=”www.360.cn”>click</a>

                这么写是不会阻止默认事件的，stop()反回false， ?onclick却没有返回值
                只有事件的返回值是false时 才会阻止默认事件 所以要这么写：

                <a onclick=”return stop();” href=”www.360.cn”>click</a>这样就会有效果

- 那么如果是用绑定事件的方式呢 会怎么样呢qwrap是用标准的事件绑定方式来做的 可以用它来测试

              <a id=”testa” href=”www.360.cn”>click</a>

              W(‘#testa’).click(function(){ return false;});// 这是一个标准的绑定事件方法
              测试后发现 ie是可以阻止默认事件的 ?标准浏览器 chrome firefox等却没有能阻止 直接发生了跳转
              分析后发现因为标准浏览器使用 addEventListener 绑定事件 而该方法是没有返回值的，
              可参见w3c文档 没有返回值， 返回值当然不会是false所以继续执行href 。
              而ie使用attachEvent的方法这个方法是有returnValue的参见
              ?http://msdn.microsoft.com/en-us/library/ie/aa703898(v=vs.85).aspx
              所以成功阻止了默认事件，

                那么使用addEventListener绑定事件 如何阻止呢 ？
                虽然addEventListener 不能有返回值 但是它有一个方法 preventDefault() 专门用来阻止默认事件 ，
                W(‘#testa’).click(function(e){ e.preventDefault();});
                这样就可以成功阻止了.
                所以 用addEventListener绑定的事件 必须用preventDefault()来阻止默认事件
                

- 但是又有一个现象

                $(‘#testa’).click(function(){return false;});jquery 却可以做到， 以上代码运行成功在所有浏览器
                这是为什么 ？这并不是jQuery可以例外 只是它悄悄的调用了preventDefault() 和 stopPropagation()
                jqeury会把事件的响应函数封装在一个dispach的函数里 如果发现你的函数return false 就会
                同时调会preventDefault() 和stopPropagation()
                所以在jquery中 return false 等价于：

                e.preventDefault()
                e.stopPropagation()
                return false;
                这三个
                
 - 关于return,要注意的是在函数里return后面的内容是不再执行的.

                function a(){ 
                  return 10; 
                  document.write(50);//不执行 
                }
                a();//10

- 最后，表单校验的时候Btn要return false阻止表单提交，阻止点击事件<a>href跳转或者冒泡用return false;
  其他应用场景尽量用return 或者 return smData;
