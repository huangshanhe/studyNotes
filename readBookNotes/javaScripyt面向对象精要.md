# javaScripyt面向对象精要 -Nicholas C. Zakas #

## 原始数据类型和引用数据类型 ##

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
          
          PS: Array.isArray(arguments); //false arguments永远返回false
          
  - 原始封装类型 var firstChar = name.charAt(0);

          背后其实有临时对象创建完用完立即销毁，所以不能追加对象，无效，自己封装容易误解。
          var name = "huangshanhe";
          var temp = new String(name);
          var firstChar = temp.charAt(0);
          temp=null
          
 ## 函数 ##
 
 - 函数声明 function fun(){};  函数表达式声明 var add = function(){};推荐函数声明，因为被提升了(引擎主动把它提到上下文的顶部)。可以先用后声明。
 
 - 函数就是值，就是对象,可以在参数里传过去,看sort例子
 
          var numbers = [1,5,8,4,7,10,2,6];
          numbers.sort(function(first,second){
                return first - second;//如果first-second>0，顺序调换，否则不变。
          });
          console.log(numbers);
          
 - 对于上述的sort();arrayObject.sort(sortby);  sortby	可选。规定排序顺序。必须是函数。
 
           因为sort()函数使用的是冒泡排序，冒泡排序会重复地走访要排序的数列，一次比较两个元素，
           如果他们的顺序错误就把他们交换过来，一直重复地进行直到说该数列已经排序完成。
           如果a-b>0(即正数)就把a和b的位置交换，也就是较小的一个数会排到前面；
           如果b-a>0就把a和b的位置交换，也就是较大的一个数会排到前面。
           
 - 函数重载，可以通过arguments.length()实现，否则就后面的会把前面的覆盖。实际使用中，检查命名参数是否为未定义更常见.
 
 - this 在函数调用时才被设置
 - 改变this的三种方法 1.call(); 2.apply() 3.bind()
 
 ## 理解对象 ##
 
 - 其实给对象添加属性的时候调用了内部的[[put]]（会在对象的一个新节点上来保存属性）,修改的时候调用内部的[[set]]
 
 - 属性探测用 in 比如 if(obj.age){}; 如果是判断是否存在，而obj.age=0;这时候就不对了，可以用 if('age' in obj){};
 
 - 彻底删除对象的属性 delete obj.name;

 - 枚举属性
