## javaScript语言精粹 ##

- 避免用　/* */注释  使用//注释

- 字符串第一个字母变成大写 i[0].toUpperCase()+i.substring(1);

- arguments并非一个真正的数组,不具备数组的方法

- 数组的长度可扩展 var arry=['0':zero,'1':one,'2':two]
  
      数组的删除如果要下标重新排列用splice
      for in 可能会获取到原型链中的意外属性，所以用for比较好
      我们可以在array数组方法库的基础上，加自定义方法
