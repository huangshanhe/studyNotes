# 2017-05-17-jquery遍历dom树 #

- **向上遍历 DOM 树，这些 jQuery 方法很有用，它们用于向上遍历 DOM 树：**

	1. parent()
	1. parents("ul")
	1. parentsUntil("div")
	
---
- **向下遍历 DOM 树,下面是两个用于向下遍历 DOM 树的 jQuery 方法：**

	1. children("p .a")
	1. find("ul #a")　 || 　查找所有　　find("*")

---
- **在 DOM 树中水平遍历，有许多有用的方法让我们在 DOM 树进行水平遍历：**
	1. siblings()//所有同胞
	1. next()//下一个
	1. nextAll()//下一个开始到最后
	1. nextUntil("h6")//下一个开始到h6之前：h2-h5
	1. prev()//前一个
	1. prevAll()//前面所有
	1. prevUntil()//和nextUntil相反
	
---
- **缩小搜索元素的范围三个最基本的过滤方法是：first(), last() 和 eq()，它们允许您基于其在一组元素中的位置来选择一个特定的元素。其他过滤方法，比如 filter() 和 not() 允许您选取匹配或不匹配某项指定标准的元素。**
	1. first()//第一个
	1. last()//最后一个
	1. eq(1)//第2个----获取jquery对象
	1. get(0)//第一个----获取DOM对象
	1. filter(".url")//class带有url
	1. not(".url")//class不带有url

---


