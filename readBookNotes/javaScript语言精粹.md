## javaScript语言精粹 ##

- 避免用　/* */注释  使用//注释

- 字符串第一个字母变成大写 i[0].toUpperCase()+i.substring(1);//+i.silce(1)怕是会更好喔！

- arguments并非一个真正的数组,不具备数组的方法

- 数组的长度可扩展 var arry=['0':zero,'1':one,'2':two]
  
          数组的删除如果要下标重新排列用splice,返回的是
          被删除的元素的数组。

                testA: function(){
                    var test = [1,2,3];
                    var aa = test.splice(1,1,"aa","bb").length;
                    var bb =test;
                    alert(aa);//2
                    alert(bb);//1,aa,bb,3
                }

          for in 可能会获取到原型链中的意外属性，所以用for比较好
          我们可以在array数组方法库的基础上，加自定义方法
          split 可以限制分割片段长度

                    var test = '|a|b|c|d|e!';
                    var a = test.split('|',3);
                    alert(a);// ,a,b

           没有任何理由使用subString(不能处理负数)  请使用slice
           
## javaScript的糟粕 ##

- 全局变量：如果全局变量的名称和子函数中的变量名称恰巧相同，就会冲突或者报错，甚至难以调试。customerId事件
- 作用域：没有块级作用域，最好在函数开头声明所有变量 ES6有块级作用域
- 自动插入封号：return 换行的时候导致错误 还是自己加封号吧;
- 保留字：一定要用的话 object['case'] = value;
- typeof null  返回不是Null  自己判断 if(a && typeof a ==="object") //a是对象或者数组
- 假值: 0 '' null undefine false NaN
- hasOwnProperty 用来解决 for in出现原型链意外值的问题，避免重写覆盖它
  
  for(var i in obj){
    if(obj.hasOwnProperty(i)){
      //操作
    }
  }

## javaScript的鸡肋 ##

- 邪恶的孪生兄弟 == !=  用 === !==最好
- width  eval别用 continue最好也别用，影响性能
- if(){}还是要加块比较好
- 避免使用 ++  -- new
