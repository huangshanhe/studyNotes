# Object和Function #

        Object.prototype是所有对象的根源
        Object.prototype只是挂载在Object函数对象上
        Function.prototype构造自Object.prototype
        Function.prototype 只是挂载在Function函数对象上
        Object函数和Function函数构造自Function.prototype
        Object字面量对象{}构造自Object.prototype
        Object字面量对象{}.__proto__（原构造对象） === Object.prototype
        Function函数 和 自定义函数 都继承（构造而成）自Function.prototype
        Function.prototype 和 Function.__proto__（原构造对象）相同
        所以，是先有的Object.prototype,再有的Function.prototype，再有的Function和Object函数对象
