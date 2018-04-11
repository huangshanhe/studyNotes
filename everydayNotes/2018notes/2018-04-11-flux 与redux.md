# flux -redux #

        自己在工作过程中做了一个总结，用很直观的方式解释下redux和react的关系，适用于真正开发当中。
        Flux在此就不涉及了，Flux本身是一套单项数据流的设计框架，redux是其的一种具体实现罢了。
        redux和react总一起出现是因为如果单单使用react，它仅仅是个view framework，不足以提供足够的前端管理和使用功能。
        而redux的引入就好像react+ MC(model controller) 一样，赋予了react完整的生态系统。当然redux不是基于MVC的。
        简单说，redux + react换了个更直观的法子实现了MVC能提供的数据管理功能。要理解下图，最核心要理解几点：

        1. React本身是基于component的View
        2. Redux是flux的一个实现，其核心有一个中心store用于管理全局state以及处理操作
        3. redux和react本身并没有任何关系。redux也可以用在MVC框架上，flux的理念可以用在任何网页或移动前端上。
        比如iOS swift也有ReSwift的框架，在iOS的MVC之上实现了单向数据流。
        4. redux和react虽然本身没有关系，但是他们各自为战都战斗力不足，合在一起确是能量值爆表，所以大部分时候，
        两个东西会通过一个叫做react-redux的库连接起来。这个库最核心的一个fucntion叫做connect。
        5. redux的核心，是action-store-reducer，action用于表示一个操作，store用于存储状态，
        reducer用于接收action并更新store中的状态。
