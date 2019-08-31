# concat、Array.from(obj)、以及[...array]的区别以及应用场景.md #

- 如果是一个对象要放进一个数组

      2.Array.from() 类数组转换成数组
      3.Array.of() 方法用于将一组值，转换为数组。

      let obj = {a: 'a', b: 'b'}

      console.log([].concat(obj)) // [{a: 'a', b: 'b'}] // 塞入数组 结果是一个array
      console.log(Array.of(obj)) // [{a: 'a', b: 'b'}]  // 塞入数组 结果是一个array
      console.log([...obj]) // 报错
      console.log(Array.from(obj)) // [] 因为没有length属性

- 合并数组

        let arr1 = [1, 2, 3],
            arr2 = [4, 5, 6],
            arr3 = [7, 8, 9];
        //ES5
        var arr = arr1.concat(arr2, arr3);
        //ES6
        let arr = [...arr1, ...arr2, ...arr3];
    
 - 解构
 
       let arr = [1, 2, 3, 4];
        [a, ...b] = arr;
        a//1
        b//[2,3,4]

- Array.from() 和 解构

        Array.from方法主要用途是将类数组(具有length属性)对象，或可遍历的对象转为真正的数组。

        我们在前面已经使用拓展运算符将类数组nodeList和arguments转为了真正的数组，
        这里Array.from方法同样能做到。你肯定会想，既然拓展运算符可以做到，为什么还要新增这个方法，因为两者还是有区别的。

        类数组对象是具有length属性的对象，nodeList，和arguments具有length属性的同时，
        其实还具有Iterator接口，所以拓展运算符才能调用Iterator接口转换。

        比如下面两个类数组对象，都具有length属性但不具备iterator接口，Array.from方法可以转为数组，但拓展运算符不能做到：
        
        let arrayLike = {
            '0': 'a',
            '1': 'b',
            '2': 'c',
            length: 3
        };
        // ES5
        let arr = Array.prototype.slice.call(arrayLike);
        // ES6
        let arr1 = Array.from(arrayLike);
        arr; //['a','b','c'];
        arr1; //['a','b','c'];
        //拓展运算符无法转换不具有iterable接口的对象
        [...arrayLike] //报错arrayLike is not iterable
        
  - Array.from()方法的第二个参数类似与数组的map方法，用于对每个元素进行处理，并将处理后的结果放入返回的数组。
  
          let arrayLike = {
            '0': 1,
            '1': 2,
            '2': 3,
            length: 3
        };
        // ES6
        let arr1 = Array.from(arrayLike, ele => ele + 1); //[2,3,4]
        
  - 如果Array.from(array, map, this)的map函数里面用到了this关键字，还可以传入Array.from的第三个参数，用来绑定this。
        
  - 如果只有length
  
        let obj = {
            length: 3
        };
        Array.from(obj); //[undefined,undefined,undefined]
        //同样拓展运算符无法转换
        [...obj]; //报错
        
 - Array.of()用于将一组值转为为数组，主要目的是弥补构造函数Array()的不足：
         
        对于创建数组，我们常推荐数组直接量，而非使用数组构造函数创建，因为对于特殊情况会得到你不想要的值：
        let arr = [3]; //[3]
        //构造函数的坑
        let arr1 = Array(3); //[undefined,undefined，undefined]
        //Array.of可以弥补这点
        let arr3 = Array.of(3) //[3]
