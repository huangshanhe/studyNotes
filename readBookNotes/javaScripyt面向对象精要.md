## javaScripyt面向对象精要 -Nicholas C. Zakas ##

- 在不使用对象的时候使用:----对象引用解除-----将对象变量置为null

          var obj1 = new Object();
          //doSomething
          obj1 = null;//在那些几百万对象的巨型程序里，街巷引用解除尤其重要
          
 - 对象属性名也可以用引号，字符串表示，尤其是你希望名字中包含空格或者其他特殊字符。
 
 -字面形式和构造函数形式，尼古拉-斯泽卡斯更推荐字面形式
 
   各种字面形式：不需要new  function fun(){};  
   构造函数形式：需要  new  var fun = new Function(){};
   
  - 访问对象的属性用[]也是挺好的，可以加空格和特殊字符，但是点号更直接。
  
          一般数据类型用typeof,引用类型用 instanceof 
          但是对于数组因为可能是另一个框架上传来的，可以用 
          var items = [];
          Array.isArray(items); //true
          
  - 原始封装类型 var firstChar = name.charAt(0);

          背后其实有临时对象创建完用完立即销毁，所以不能追加对象，无效，自己封装容易误解。
          var name = "huangshanhe";
          var temp = new String(name);
          var firstChar = temp.charAt(0);
          temp=null
          
  - 
