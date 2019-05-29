# sync、await详解 #

- async/await 让我们摆脱了回调地狱，但是这又引入了 async/await 地狱的问题

- 比如

        (async () => {
         const pizzaData = await getPizzaData() // async call
         const drinkData = await getDrinkData() // async call
         const chosenPizza = choosePizza() // sync call
         const chosenDrink = chooseDrink() // sync call
         await addPizzaToCart(chosenPizza) // async call
         await addDrinkToCart(chosenDrink) // async call
         orderItems() // async call
        })()
        
- 应该如何避免 async/await 地狱

        首先我们需要知道哪些命名是有前后依赖关系的。
        然后将有依赖关系的系列操作进行分组合并成一个异步操作。
        同时执行这些异步函数。
        我们来重写这写例子：       
        
        async function selectPizza() {
         const pizzaData = await getPizzaData() // async call
         const chosenPizza = choosePizza() // sync call
         await addPizzaToCart(chosenPizza) // async call
        }

        async function selectDrink() {
         const drinkData = await getDrinkData() // async call
         const chosenDrink = chooseDrink() // sync call
         await addDrinkToCart(chosenDrink) // async call
        }

        (async () => {
         const pizzaPromise = selectPizza()
         const drinkPromise = selectDrink()
         await pizzaPromise
         await drinkPromise
         orderItems() // async call
        })()

        // Although I prefer it this way

        (async () => {
         Promise.all([selectPizza(), selectDrink()].then(orderItems) // async call
        })()
        
        我们将语句分成两个函数。在函数内部，每个语句都依赖于前一个语句的执行。然后我们同时执行这两个函数 selectPizza()和selectDrink() 。

        在第二个例子中我们需要处理未知数量的 Promise。处理这个问题非常简单，我们只需要创建一个数组将所有 Promise 存入其中，
        使用 Promise.all() 方法并行执行：
