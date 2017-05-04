#markDown study notes
##首先是快捷键
- ctrl+1 一级标题 
- ctrl+2 二级标题 
- ····
- ctrl+shift+o 有序列表
- ctrl+u 无序列表
- ctrl+g 插入图片
- ctrl+l 插入超链接

	RStudio这样的神级编辑器,我们还可以快速将Markdown转化为演讲PPT、Word产品文档、LaTex论文甚至是用非常少量的代码完成最小可用原型。

* **分割线**

***
---
1. **加粗**：用**包起来
2. *斜体*：用*包起来
3. 分割线 三个*** 或者 ---
4. 有序排列 1.+空格
5. 无序排列 *+空格
6. **链接:**[百度点这里](http://www.baidu.com/ "百度") 

***
## **代码块**
**用```+代码类型+``包起来或者直接Tab**

	$GF.push(function(){
	      var Main = {
	        init: function() {
	            this.reqCustomer();
	            this.reqTeamuser();
	            this.resetSearch();
	            this.deleteActivity();
	            this.deleteBatch();
	            this.watchDetail();
	            this.searchActivity();
	        },
		}
		Main.init();


##**图片**
![八哥犬](http://e.hiphotos.baidu.com/baike/w%3D268%3Bg%3D0/sign=e4c5be4c00f79052ef1f403834c8b0f7/f9dcd100baa1cd11b6eabf7fb012c8fcc3ce2d15.jpg)