# if else和switch比较 #

- switch与if..else 的执行的效率问题

                var fileType = 2;
                switch(fileType){//switch的case后面只能是常量 if什么&&是不合适的
                    case 0: console.log('000'); break;
                    case 1: case 2: console.log('111'); break;//可以多个常量一起
                    case 3: console.log('222'); break;
                    default: console.log('nnn');
                }

             今天读一前辈的程序，发现其在串口中断里面为了分析协议的报文类型，在中断函数里面
             使用if..else语句。因为报文类型在现在看来只有两种，以后有可能还会增加，不确定。

             本人以为这样用有些不妥，为什么不用switch语句呢？猜想是不是因为效率方面的考虑呢，
             毕竟我们应该尽量是中断的处理代码更加简洁，时间效率更高才好。
             所以本人就查找相关资料，资料显示switch语句反而比ifelse的执行效率要高。
 
 - 下面来详细描述switch与ifelse的区别。

               switch...case与if...else的根本区别在于，switch...case会生成一个跳转表来指示
               实际的case分支的地址，而这个跳转表的索引号与switch变量的值是相等的。从而，switch...case
               不用像if...else那样遍历条件分支直到命中条件，而只需访问对应索引号的表项从而到达定位分支的目的。

              具体地说，switch...case会生成一份大小（表项数）为最大case常量＋1的跳表，程序首先
              判断switch变量是否大于最大case 常量，若大于，则跳到default分支处理；否则取得索引号为switch变量大小的
              跳表项的地址（即跳表的起始地址＋表项大小＊索引号），程序接着跳到此地址执行，到此完成了分支的跳转。



- 由此看来，switch有点以空间换时间的意思，而事实上也的确如此。

                1.当分支较多时，当时用switch的效率是很高的。因为switch是随机访问的，
                就是确定了选择值之后直接跳转到那个特定的分支，但是if。。else是遍历所以得可能值，
                知道找到符合条件的分支。如此看来，switch的效率确实比ifelse要高的多。

                2.由上面的汇编代码可知道，switch...case占用较多的代码空间，
                因为它要生成跳表，特别是当case常量分布范围很大但实际有效值
                又比较少的情况，switch...case的空间利用率将变得很低。

                3.switch...case只能处理case为常量的情况，对非常量的情况是
                无能为力的。例如 if (a > 1 && a < 100)，是无法使用switch...case
                来处理的。所以，switch只能是在常量选择分支时比ifelse效率高，但是ifelse能应用于更多的场合，ifelse比较灵活。

- 由此看来，上面前辈的中断处理程序中用switch是比较合适的，即节省了时间，
- 而且对于以后程序的扩展也是很方便。因为报文类型这个值基本上都是用整形常量来表示的。
