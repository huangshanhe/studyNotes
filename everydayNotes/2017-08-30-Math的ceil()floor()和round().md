# 下面来介绍将小数值舍入为整数的几个方法：Math.ceil()、Math.floor()和Math.round()。 这三个方法分别遵循下列舍入规则： #

                ◎Math.ceil()执行向上舍入，即它总是将数值向上舍入为最接近的整数；
                ◎Math.floor()执行向下舍入，即它总是将数值向下舍入为最接近的整数；
                ◎Math.round()执行标准舍入，即它总是将数值四舍五入为最接近的整数
                (这也是我们在数学课上学到的舍入规则)。
                下面是使用这些方法的示例：

                alert(Math.ceil(25.9)); //26
                alert(Math.ceil(25.5)); //26
                alert(Math.ceil(25.1)); //26
                alert(Math.round(25.9)); //26
                alert(Math.round(25.5)); //26
                alert(Math.round(25.1)); //25
                alert(Math.floor(25.9)); //25
                alert(Math.floor(25.5)); //25
                alert(Math.floor(25.1)); //25

                南昌网络公司技术人员总结:对于所有介于25和26(不包括26)之间的数值，
                Math.ceil()始终返回26，因为它执行的是向上舍入。Math.round()方法
                只在数值大于等于25.5时返回26；否则返回25。最后，Math.floor()
                对所有介于25和26(不包括26)之间的数值都返回25。


                以下是一些补充：
                ceil()：将小数部分一律向整数部分进位。 
                如： 

                Math.ceil(12.2)//返回13 
                Math.ceil(12.7)//返回13 
                Math.ceil(12.0)// 返回12 

                floor()：一律舍去，仅保留整数。 
                如： 

                Math.floor(12.2)// 返回12 
                Math.floor(12.7)//返回12 
                Math.floor(12.0)//返回12 

                round()：进行四舍五入 
                如： 

                Math.round(12.2)// 返回12 
                Math.round(12.7)//返回13 
                Math.round(12.0)//返回12
