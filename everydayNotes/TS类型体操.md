---
highlight: an-old-hope
theme: channing-cyan
---

# TS 从入门到体操全能🤸‍

### 前言

    相信大家对`TS`并不陌生，但是对于一些平时维护传统业务较多，没有机会深入实践TS的前端er，那么面试的时候被问到TS问题甚至迎面甩来一道TS体操题就一脸懵逼了（尤其是平时`any`大法用得比较多)。为了避免这种尴尬，本文就从`TS`的基础概念配合15道类型体操训练和15道高频面试题来帮助大家入门。（PS：大佬说TS是图灵完备的，可以整各种花活，实现一套中国象棋不在话下！🐂🍺）
[象棋实现地址](https://zhuanlan.zhihu.com/p/426966480)

### 什么是 TS？

    [TypeScript](https://www.typescriptlang.org/) 是一种由微软开发的开源编程语言，它是 JavaScript 的超集，为 JavaScript 添加了静态类型系统、接口、类等特性。这使得大型项目的开发更加可靠和可维护，在开发过程中能够提前发现一些类型错误，提高代码质量。同时，TypeScript 可以编译成纯 JavaScript，在任何支持JavaScript 的环境中运行。

*   对概念比较熟悉的同学可以跳过本章，直接[点击此处练体操](#anchor-point)<br>
*   体操也不想练的可以直接[点击此处看面试真题](#mszt)

### TypeScript 类型

在TypeScript中，常见的数据类型包括以下几种：

*   **基本类型**：

    *   `number`: 表示数字，包括整数和浮点数。
    *   `string`: 表示文本字符串。
    *   `boolean`: 表示布尔值，即`true`或`false`。
    *   `null`、`undefined`: 分别表示null和undefined。
    *   `symbol`: 表示唯一的、不可变的值。

*   **复合类型**：

    *   `array`: 表示数组，可以使用`number[]`或`Array<number>`来声明其中元素的类型。
    *   `tuple`: 表示元组，用于表示固定数量和类型的数组。
    *   `enum`: 表示枚举类型，用于定义具名常量集合。

*   **对象类型**：

    *   `object`: 表示非原始类型，即除number、string、boolean、symbol、null或undefined之外的类型。
    *   `interface`: 用于描述对象的结构，并且可以重复使用。

*   **函数类型**：

    *   `function`: 表示函数类型。
    *   `void`: 表示函数没有返回值。
    *   `any`: 表示任意类型。

*   **高级类型**：

    *   `union types`: 表示一个值可以是几种类型之一。
    *   `intersection types`: 表示一个值同时拥有多种类型的特性。

*   代码：

```ts
// 布尔类型
let isDone: boolean = false;

// 数字类型
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// 字符串类型
let color: string = "blue";
color = 'red';
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}. I'll be ${age + 1} years old next year.`;

// 数组类型
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [4, 5, 6];

// 元组类型
let x: [string, number];
x = ['hello', 10];

// 枚举类型
enum Color {
    Red,
    Green,
    Blue
}
let c: Color = Color.Green;

// 任意类型
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;

// 空值类型
function warnUser(): void {
    console.log("This is a warning!");
}

// null 和 undefined 类型
let u: undefined = undefined;
let n: null = null;

// 联合类型
let unionValue: string | number = 'abc';
unionValue = 123;

// 交叉类型
interface A {
    aProp: string;
}
interface B {
    bProp: number;
}
let intersectionValue: A & B = { aProp: 'str', bProp: 456 };

// 字面量类型
let literal: 'red' | 'green' | 'blue' = 'green';

// 函数类型
function add(a: number, b: number): number {
    return a + b;
}

// 对象类型
let obj: { name: string, age: number } = { name: 'Tom', age: 25 };
```

### unknown 类型 和 never类型

就像所有类型都可以赋值给 `any`，所有类型也都可以赋值给 `unknown`。这使得 `unknown` 成为 TypeScript 类型系统的另一种顶级类型（另一种是 `any`）。<br>
unknown指的是**不可预先定义的类型**，在很多场景下，它可以替代any的功能同时保留静态检查的能力。
unknown的一个使用场景是，避免使用any作为函数的参数类型而导致的静态类型检查bug：

```ts
function test(input: unknown): number {
  if (Array.isArray(input)) {
    return input.length;    // Pass: 这个代码块中，类型守卫已经将input识别为array类型
  }
  return input.length;      // Error: 这里的input还是unknown类型，静态检查报错。如果入参是any，则会放弃检查直接成功，带来报错风险
}
```

我们在一些无法确定函数参数（返回值）类型中 unknown 使用的场景非常多

```ts
// 在不确定函数参数的类型时
// 将函数的参数声明为unknown类型而非any
// TS同样会对于unknown进行类型检测，而any就不会
function resultValueBySome(val:unknown) { 
  if (typeof val === 'string') {  
    // 此时 val 是string类型   
    // do someThing 
  } else if (typeof val === 'number') { 
    // 此时 val 是number类型   
    // do someThing  
  } 
  // ...
}

```

never 类型便为空类型和底部类型。never 类型的变量无法被赋值，与其他类型求交集为自身，求并集不参与运算。

```ts
type Exclude<T, U> = T extends U ? never : T;

// 相当于: type A = 'a'
type A = Exclude<'x' | 'a', 'x' | 'y' | 'z'>

T | never // 结果为T
T & never // 结果为never
```

1、类型之间的并集（`|`）会向上取顶部的类型。即`never | 'a' => 'a'`，`unknown | 'a' => 'unknown'` <br>
2、类型之间的交集（`&`）会向下取底部的类型。即`never & 'a' = never`，`unknown & 'a' => 'a'`

*   bottom Type: never
*   top type: unknown
*   既是top也是bottom: any

### interface 和 type

*   使用 interface 定义接口，使用 type 定义类型别名
*   都可以约束对象的结构

区别:

*   interface 只描述对象，type 则可以描述所有数据

*   interface 使用 extends 来实现继承，type 使用 & 来实现交叉类型

*   interface 会创建新的类型名，type 只是创建类型别名，并没有创建新类型

*   interface 可以重复声明扩展，type 则不行（别名是不能重复的）

扩展示例：

```ts
  interface Person {
    name: string;
    age: number;
  }
  interface Employee extends Person {
    jobTitle: string;
  }

  type PersonType = {
    name: string;
    age: number;
  };
  type EmployeeType = PersonType & {
    jobTitle: string;
  };
```

### 泛型

在 TypeScript 中，泛型是一种在定义函数、接口或类的时候，不预先指定具体的类型，而是在使用的时候再指定类型的技术。

**一、泛型的作用**

1.  提高代码的可重用性

    *   泛型允许你编写可以适用于多种不同类型的代码，而不是为每种类型都编写重复的代码。例如，你可以编写一个泛型函数来对数组进行操作，无论数组中的元素是数字、字符串还是其他任何类型，这个函数都可以正常工作。
    *   例如：

```ts
     function identity<T>(arg: T): T {
       return arg;
     }
     let output1 = identity<string>("myString");
     let output2 = identity<number>(123);
```

2.  增强类型安全性

    *   通过泛型，TypeScript 可以在编译时进行更严格的类型检查，确保代码在运行时不会出现类型不匹配的错误。例如，在泛型函数中，TypeScript 可以根据传入的类型参数推断出函数内部操作的正确类型，从而避免了潜在的类型错误。
    *   例如：

```ts
     function reverseArray<T>(array: T[]): T[] {
       return array.reverse();
     }
     let numbers = [1, 2, 3];
     let reversedNumbers = reverseArray<number>(numbers);
     // TypeScript 会确保 reversedNumbers 的类型是 number[]，避免了意外的类型错误。
```

**二、泛型的语法**

1.  函数中的泛型

    *   在函数定义时，使用`<T>`（这里的`T`是一个类型参数，可以根据需要自定义名称）来表示泛型。在函数调用时，可以传入具体的类型参数来指定函数操作的类型。
    *   例如：

```ts
     function mapArray<T, U>(array: T[], callback: (item: T) => U): U[] {
       return array.map(callback);
     }
     let numbers = [1, 2, 3];
     let doubledNumbers = mapArray<number, number>(numbers, n => n * 2);
     let stringifiedNumbers = mapArray<number, string>(numbers, n => n.toString());
```

2.  接口中的泛型

    *   在接口定义时，可以使用泛型来使接口更加灵活和通用。例如，定义一个泛型接口来表示一个可以存储任意类型数据的容器。
    *   例如：

```ts
     interface Container<T> {
       value: T;
       setValue(newValue: T): void;
     }
     class NumberContainer implements Container<number> {
       value: number;
       setValue(newValue: number): void {
         this.value = newValue;
       }
     }
```

3.  类中的泛型

    *   在类定义时，可以使用泛型来使类更加通用。例如，定义一个泛型类来表示一个栈数据结构，可以存储任意类型的数据。
    *   例如：

```ts
     class Stack<T> {
       private items: T[] = [];
       push(item: T): void {
         this.items.push(item);
       }
       pop(): T | undefined {
         return this.items.pop();
       }
     }
     let numberStack = new Stack<number>();
     numberStack.push(1);
     numberStack.push(2);
     let poppedNumber = numberStack.pop();
```

总之，泛型是 TypeScript 中一种非常强大的技术，可以提高代码的可重用性和类型安全性，使代码更加灵活和通用。

### 函数重载

在 TypeScript 中，函数重载是一种允许你为同一个函数定义多个不同参数类型和返回值类型的特性。

**一、函数重载的作用**

1.  提高代码的可读性和可维护性：通过为不同的参数类型提供明确的函数签名，可以使代码更加清晰易懂。其他开发者在阅读你的代码时，可以更容易地理解函数的作用和预期的输入输出类型。

    *   例如，假设有一个函数用于计算两个数的和。如果没有函数重载，可能需要通过注释或文档来解释不同参数类型的用法。而使用函数重载，可以直接在代码中看到不同参数类型对应的函数签名，提高了代码的可读性。

2.  增强类型安全性：TypeScript 编译器可以根据函数重载的签名进行类型检查，确保在调用函数时传入正确的参数类型。如果传入的参数类型不匹配任何一个重载签名，编译器会报错，从而避免了潜在的类型错误。

    *   例如：

```ts
     function add(a: number, b: number): number;
     function add(a: string, b: string): string;
     function add(a: any, b: any): any {
       if (typeof a === 'number' && typeof b === 'number') {
         return a + b;
       } else if (typeof a === 'string' && typeof b === 'string') {
         return a + b;
       }
     }
     let sum1 = add(1, 2); // sum1 的类型是 number
     let sum2 = add('hello', 'world'); // sum2 的类型是 string
```

**二、函数重载的语法**

1.  定义多个函数签名：首先，定义多个函数签名，每个签名表示一种不同的参数类型组合。函数签名只包含参数类型和返回值类型，不包含函数体。

    *   例如：

```ts
     function greet(name: string): string;
     function greet(age: number): string;
```

2.  实现函数体：在最后一个函数签名之后，实现函数的具体逻辑。函数体中的代码需要根据不同的参数类型进行相应的处理，以满足所有的函数签名。

    *   例如：

```ts
     function greet(name: string): string;
     function greet(age: number): string;
     function greet(arg: any): string {
       if (typeof arg === 'string') {
         return `Hello, ${arg}!`;
       } else if (typeof arg === 'number') {
         return `You are ${arg} years old.`;
       }
     }
```

总之，函数重载是 TypeScript 中一种非常有用的特性，可以提高代码的可读性、可维护性和类型安全性。通过为同一个函数定义多个不同的参数类型和返回值类型，可以使函数更加灵活和通用，适应不同的使用场景。

### 类型、非空、常量断言

**一、类型断言**

类型断言是一种告诉编译器你比它更了解某个值的类型的方式。它有两种语法形式：

1.  `<类型>值`：

    *   例如：

```ts
     let someValue: any = "Hello";
     let strLength: number = (<string>someValue).length;
```

2.  `值 as 类型`：

    *   例如：

```ts
     let someValue: any = 123;
     let strValue: string = (someValue as string).toUpperCase();
```

类型断言应该谨慎使用，因为如果断言错误，在运行时可能会导致错误。

**二、非空断言**

非空断言操作符（`!`）用于告诉 TypeScript 编译器某个值在特定的上下文中不会是`null`或`undefined`。

例如：

```ts
function processValue(value?: string) {
  const length = value!.length; // 假设在这个上下文中，value 不会是 null 或 undefined
  return length;
}
```

但要注意，非空断言只是一种告诉编译器的方式，不能保证在运行时该值确实不为`null`或`undefined`，如果在运行时该值为`null`或`undefined`，会导致运行时错误。

**三、常量断言**

常量断言使用`as const`语法，它可以将一个值断言为常量，使得 TypeScript 尽可能地推断出最窄的类型。

例如：

```ts
const arr = [1, 2, 3] as const;
// arr 的类型被推断为 readonly [1, 2, 3]，而不是 number[]
```

常量断言在一些场景下很有用，比如确保对象的属性不可修改，或者确保数组的元素类型是具体的字面量类型而不是更宽泛的类型。

### 类型收窄

在 TypeScript 中，类型收窄（Type Narrowing）是一种在运行时根据特定的条件判断来缩小变量可能类型范围的技术。

**一、类型收窄的作用**

1.  提高类型安全性：通过类型收窄，可以在特定的代码分支中确定变量的更具体类型，从而使 TypeScript 编译器能够进行更准确的类型检查，减少潜在的类型错误。

    *   例如，假设一个函数接收一个参数，这个参数可能是字符串或数字类型。在函数内部，可以通过类型判断来确定参数的具体类型，并进行相应的操作。这样可以避免在不确定参数类型的情况下进行不恰当的操作，提高代码的安全性。

2.  增强代码的可读性和可维护性：类型收窄可以使代码更加清晰地表达不同情况下变量的类型变化，使其他开发者更容易理解代码的逻辑。同时，当需要修改代码时，也更容易确定哪些部分需要根据类型变化进行调整。

    *   例如，在一个处理用户输入的函数中，可以通过类型收窄来区分不同类型的输入，并进行相应的处理。这样可以使代码的逻辑更加清晰，易于维护。

**二、类型收窄的方法**

1.  使用类型判断语句

    *   `typeof`判断：可以使用`typeof`操作符来判断一个变量的基本类型（如`string`、`number`、`boolean`等）。

```ts
     function processValue(value: string | number) {
       if (typeof value === 'string') {
         // 在这个分支中，value 的类型被收窄为 string
         console.log(value.length);
       } else {
         // 在这个分支中，value 的类型被收窄为 number
         console.log(value.toFixed(2));
       }
     }
```

*   `instanceof`判断：对于类的实例，可以使用`instanceof`操作符来判断一个变量是否是某个类的实例。

```ts
     class Animal {
       makeSound() {
         console.log('Some sound');
       }
     }
     class Dog extends Animal {
       bark() {
         console.log('Woof!');
       }
     }
     function processAnimal(animal: Animal) {
       if (animal instanceof Dog) {
         // 在这个分支中，animal 的类型被收窄为 Dog
         animal.bark();
       } else {
         animal.makeSound();
       }
     }
```

2.  使用逻辑判断

    *   可以通过对变量的属性或方法的存在性进行判断来进行类型收窄。

```ts
     interface Bird {
       fly(): void;
     }
     interface Penguin {
       swim(): void;
     }
     function processBirdOrPenguin(birdOrPenguin: Bird | Penguin) {
       if ('swim' in birdOrPenguin) {
         // 在这个分支中，birdOrPenguin 的类型被收窄为 Penguin
         birdOrPenguin.swim();
       } else {
         // 在这个分支中，birdOrPenguin 的类型被收窄为 Bird
         birdOrPenguin.fly();
       }
     }
```

3.  使用类型守卫函数

    *   可以定义一个函数来进行类型判断，这种函数被称为类型守卫函数。

```ts
     function isString(value: any): value is string {
       return typeof value === 'string';
     }
     function processValue(value: string | number) {
       if (isString(value)) {
         // 在这个分支中，value 的类型被收窄为 string
         console.log(value.length);
       } else {
         // 在这个分支中，value 的类型被收窄为 number
         console.log(value.toFixed(2));
       }
     }
```

总之，类型收窄是 TypeScript 中一种非常有用的技术，可以提高代码的类型安全性、可读性和可维护性。通过使用不同的方法进行类型收窄，可以在运行时根据特定的条件判断来确定变量的更具体类型，从而使代码更加健壮和可靠。

### 逆变和协变

在 TypeScript 中，逆变（Contravariance）和协变（Covariance）是与类型系统中的子类型关系相关的概念。

**一、协变**

1.  定义：如果类型`A`是类型`B`的子类型，并且对于某个类型参数`T`，包含`T`的容器类型`Container<T>`中，`Container<A>`也是`Container<B>`的子类型，那么就称这种关系为协变。

2.  示例：

    *   在 TypeScript 中，数组类型在处理元素类型时表现出协变性。例如，如果`Animal`是父类型，`Cat`是`Animal`的子类型，那么`Cat[]`是`Animal[]`的子类型。

```ts
   class Animal { }
   class Cat extends Animal { }
   let animals: Animal[] = [];
   let cats: Cat[] = [];
   animals = cats; // 因为数组类型在元素类型上表现出协变性，所以这是合法的赋值
```

**二、逆变**

1.  定义：如果类型`A`是类型`B`的子类型，并且对于某个类型参数`T`，包含`T`的容器类型`Container<T>`中，`Container<B>`是`Container<A>`的子类型，那么就称这种关系为逆变。

2.  示例：

    *   在函数参数的类型中，表现出逆变的特性。例如，如果`Animal`是父类型，`Cat`是`Animal`的子类型，对于一个函数类型`(arg: Animal) => void`和`(arg: Cat) => void`，前者可以赋值给后者。

```ts
   class Animal { }
   class Cat extends Animal { }
   let animalFunc: (arg: Animal) => void;
   let catFunc: (arg: Cat) => void;
   animalFunc = catFunc; // 因为函数参数类型表现出逆变特性，所以这是合法的赋值
```

理解逆变和协变对于正确处理类型系统中的子类型关系以及编写安全和灵活的 TypeScript 代码非常重要。但在使用时需要谨慎，因为不正确的使用可能会导致类型不匹配的错误。

## <span id="anchor-point">体操15套🤸‍</span>

### 1、实现类型版本的 `Array.unshift`。

雏鹰起飞，是不是很简单！（先找找感觉，增加自信）<br>

*   实现类型版本的 `Array.unshift`。

```ts
type Result = Unshift<[1, 2], 0>; // [0, 1, 2,]
```

*   解答

```ts
type Unshift<T extends any[], U> = [U, ...T];
```

*   知识点: 元组使用扩展操作符

### 2、实现Partial

*   题目：实现 Partial，全部变成可选

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type TodoPreview = Partial<Todo>; 
// expect
// type TodoPreview = {
//     title?: string;
//     description?: string;
//     completed?: boolean;
// }
```

*   解答：
    遍历加keyof全部变为可选即可

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type TodoPreview = Partial<Todo>; 
// expect
// type TodoPreview = {
//     title?: string;
//     description?: string;
//     completed?: boolean;
// }

type MyPartial<T> = {
  [P in keyof T]?: T[P];
};
```

*   知识点：in 遍历 keyof 所有key

### 3、实现Exclude

*   题目：实现Exclude
*   从联合类型 T 中排除 U 的类型成员，来构造一个新的类型。

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type TodoPreview = MyExclude<keyof Todo, 'description'>; 
// type TodoPreview = "title" | "completed"
```

*   解答：

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type TodoPreview = MyExclude<keyof Todo, 'description'>; 
// type TodoPreview = "title" | "completed"

type MyExclude<T, U> = T extends U ? never : T;
```

*   知识点：ts 分发特性
*   在 `A extends B ? true : false` 中，如果 `A` 是联合类型，那么就会触发 ts 的分发特性。
*   要注意的是，只有泛型才会触发分发特性：

```ts
type Example<T> = T extends string ? T : boolean;
// 1 | '3' | {} | [] extends string 会触发分发特性，会转变成如下逻辑:
// 需要注意的是 T 在分发后，还是用 T 表示，但是此时的 T 仅仅表示的是联合类型中的那一项，而非整个联合类型
// 1 extends string ? 1 : boolean | '3' extends string ? '3' : boolean | {} extends string ? {} : boolean | [] extends string ? [] : boolean
// boolean | '3' | boolean | boolean
// Case1 = boolean | '3'
type Case1 = Example<1 | '3' | {} | []>;
```

### 4、实现Omit

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>;

const todo: TodoPreview = {
  completed: false,
};

// 官方实现
// type Exclude<T, U> = T extends U ? never : T
// 官方实现
// type Omit<T, K extends string | number | symbol> = { [P in Exclude<keyof T, K>]: T[P]; }

// 利用 as 强制转换键值类型，又借助条件表达式将符合条件的键值改为 never，从而达到目标。
type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
}
```

### 5、实现If

*   题目：实现一个 `IF` 类型，它接收一个条件类型 `C` ，一个判断为真时的返回类型 `T` ，以及一个判断为假时的返回类型 `F`。 `C` 只能是 `true` 或者 `false`， `T` 和 `F` 可以是任意类型。

```ts
type A = If<true, 'a', 'b'>; // expected to be 'a'
type B = If<false, 'a', 'b'>; // expected to be 'b'
```

*   解答：
    此题目利用 ts 的 [conditional-types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)可以非常简单的解决。

```ts
type If<C extends boolean, T, F> = C extends true ? T : F;
```

*   知识点：`A extends B ? 1 : 2`，ts 的条件判断类型

### 6、实现TrimLeft

*   题目：实现 `TrimLeft<T>` ，它接收确定的字符串类型并返回一个新的字符串，其中新返回的字符串删除了原字符串开头的空白字符串。

```ts
type trimed = TrimLeft<'  Hello World  '>; // 应推导出 'Hello World  '
```

*   解答：
    通过 infer 来遍历,如果有多个空格就递归。

```ts
// ${' ' | '\n' | '\t'} 占据一个字符，R 匹配剩余的字符，如果能够匹配，证明第一个字符就是空白字符，此时需要继续处理剩余字符 R，否则返回当前字符 S
type TrimLeft<S extends string> = S extends `${' ' | '\n' | '\t'}${infer R}`
  ? TrimLeft<R>
  : S;
```

*   知识点：字符遍历：`` T extends `${F}${R}` ``

### 7、实现按类型查找

*   题目：通过在联合类型`Cat | Dog`中搜索公共`type`字段来获取相应的类型。换句话说，在以下示例中，我们期望`LookUp<Dog | Cat, 'dog'>`获得`Dog`，`LookUp<Dog | Cat, 'cat'>`获得`Cat`。

```ts
interface Cat {
  type: 'cat';
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal';
}

interface Dog {
  type: 'dog';
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer';
  color: 'brown' | 'white' | 'black';
}

type MyDog = LookUp<Cat | Dog, 'dog'>; // expected to be `Dog`
```

*   解答：

```ts
type LookUp<U, T> = U extends { type: T } ? U : never;

// 分发特性
// step1: Cat extends { type: 'dog' } ? Cat : never -> never
// step2: Dog extends { type: 'dog' } ? Dog : never -> Dog
// step3: never | Dog -> Dog
type MyDog = LookUp<Cat | Dog, 'dog'>;
```

*   知识点：泛型下联合类型的分发特性 和 条件表达式

### 8、实现Absolute

*   题目：实现一个接收 string,number 或 bigInt 类型参数的`Absolute`类型,返回一个正数字符串。

```ts
type Test = -100;
type Result = Absolute<Test>; // expected to be "100"
```

*   解答：转换成字符后，可以直接进行 `-` 号的匹配，有 `-` 号，就只保留剩余的字符，否则全部保留即可。

```ts
type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer S}`
  ? // 有 - 号，保留剩余的字符
    `${S}`
  : // 否则保留原字符即可
    `${T}`;
```

*   知识点：

1.  number 转 string
2.  字符推断匹配套路： `` A extends `-${infer R}` ``

### 9、实现Flatten

*   题目：写一个接受数组的类型，并且返回扁平化的数组类型

```ts
type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]>; // [1, 2, 3, 4, 5]
```

*   解答：
    遍历元组，当元素还是元组时，继续递归处理，直到元素非元组结束。
    元组的遍历方法可以通过匹配推断：`A extends [infer F, ...infer R]`

```ts
type Flatten<T> =
  // 遍历获取第一个元素
  T extends [infer F, ...infer R]
    ? // 第一个元素是否时元组
      F extends any[]
      ? // 是，那么需要递归处理第一个元素，同时拼接上递归处理后的剩余元素
        [...Flatten<F>, ...Flatten<R>]
      : // 不是，直接返回第一个元素，并拼接上递归处理后的剩余元素
        [F, ...Flatten<R>]
    : // 遍历结束，返回空元组，这样可以保证拼接结果的正确
      [];
```

*   知识点：

1.  元组遍历套路： `T extends [infer F, ...infer R]`
2.  元组遍历边界条件：推断的类型有两个，当入参没有元素时，会走 false 逻辑

### 10、Readonly2

*   题目：实现一个通用`MyReadonly2<T, K>`，它带有两种类型的参数`T`和`K`。
    `K`指定应设置为 Readonly 的`T`的属性集。如果未提供`K`，则应使所有属性都变为只读，就像普通的`Readonly<T>`一样。

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

const todo: MyReadonly2<Todo, 'title' | 'description'> = {
  title: 'Hey',
  description: 'foobar',
  completed: false,
};

todo.title = 'Hello'; // Error: cannot reassign a readonly property
todo.description = 'barFoo'; // Error: cannot reassign a readonly property
todo.completed = true; // OK
```

*   解答

```ts
type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [P in keyof T] : T[P];
} & {
  [P in keyof T as P extends K ? never : P] : T[P];
}
```

*   知识点:

1.  缺省值设置 K extends keyof T = keyof T
2.  遍历
    写一个接受数组的类型，并且返回扁平化的数组类型

### 11、实现DeepReadonly

*   题目：实现一个通用的`DeepReadonly<T>`，它将对象的每个参数及其子对象递归地设为只读。
    您可以假设在此挑战中我们仅处理对象。数组，函数，类等都无需考虑。但是，您仍然可以通过覆盖尽可能多的不同案例来挑战自己。

```ts
type X = {
  x: {
    a: 1;
    b: 'hi';
  };
  y: 'hey';
};

type Expected = {
  readonly x: {
    readonly a: 1;
    readonly b: 'hi';
  };
  readonly y: 'hey';
};

type Todo = DeepReadonly<X>; // should be same as `Expected`
```

*   解答：
    通过 `T[P] extends {} ? DeepReadonly<T[P]> : T[P]` 对属性值进行二次判断，如果是继承自 对象，那么就递归处理，否则返回原始属性值。<br>
    对于函数执行遍历，那么由于 `keyof (() => {})` 是 `never`，新的类型的属性就为空，从而返回 `{}`。
    所以对于此题，只需要增加函数的额外处理即可。

```ts
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends Function
    ? T[P]
    : T[P] extends {}
    ? DeepReadonly<T[P]>
    : T[P];
};
```

*   知识点：

1.  递归处理嵌套问题
2.  元组可以使用遍历对象的方法进行遍历
3.  `(() => {}) extends {}` 结果为 true

### 12、实现Parameters

*   题目：实现内置的 `Parameters<T>` 类型，而不是直接使用它，可参考[TypeScript 官方文档 (opens new window)](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype)。

```ts
const foo = (arg1: string, arg2: number): void => {};

// [arg1: string, arg2: number]
type FunctionParamsType = MyParameters<typeof foo>;
```

*   解答：
    常规套路：`A extends infer B` 这样的匹配推断，不过这里推断的是函数的参数。可以先从一个参数推断开始：

```ts
// infer 处于第一个参数的位置，故可以得到第一个参数
// 如果函数没有第一个参数，则会推断出来 unknown，并不会走 false 逻辑
type MyFirstParameter<T> = T extends (arg: infer F) => any ? F : never;

// Case1 = number;
type Case1 = MyFirstParameter<(a: number) => {}>;

// Case2 = unknown，特殊情况，没有参数
type Case2 = MyFirstParameter<() => {}>;
```

通过扩展操作符推断所有参数

```ts
type Parameters<T extends (...args: any) => any> =
  // 扩展操作符，推断出 P
  T extends (...args: infer P) => any ? P : never;
```

*   知识点：

1.  函数类型，也可以做推断匹配，`A extends (...args: infer P) => infer R`
2.  函数类型，推断匹配时，使用扩展操作符

### 13、实现ReplaceAll

*   题目：实现 `ReplaceAll<S, From, To>` 将一个字符串 `S` 中的所有子字符串 `From` 替换为 `To`。

```ts
type replaced = ReplaceAll<'t y p e s', ' ', ''>; // 期望是 'types'
```

*   解答：
    巩固一下递归嵌套

```ts
type ReplaceAll<S extends string, From extends string, To extends string> =
  // 特殊情况处理
  From extends ''
    ? S
    : S extends `${infer F}${From}${infer R}`
    ? // 核心在于 递归嵌套处理剩余字符
      `${F}${To}${ReplaceAll<R, From, To>}`
    : S;
```

*   知识点：

1.  字符匹配推断：`` A extends `${infer F}${From}${infer R}` ``
2.  递归处理剩余字符

### 14、实现AppendToObject

*   题目：实现一个为接口添加一个新字段的类型。该类型接收三个参数，返回带有新字段的接口类型。

```ts
type Test = { id: '1' };
type Result = AppendToObject<Test, 'value', 4>; // expected to be { id: '1', value: 4 }
```

*   解答：

```ts
type Merge<T> = {
  [P in keyof T]: T[P];
};

type AppendToObject<T, U extends string, V> = Merge<
  T & {
    [K in U]: V;
  }
>;
```

为什么需要 `Merge` 包裹一层？

```ts
export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T,
>() => T extends Y ? 1 : 2
  ? true
  : false;

type A = {
  a: number;
  b: number;
};

type B = {
  a: number;
} & {
  b: number;
};

type Merge<T> = {
  [P in keyof T]: T[P];
};

// false
type Case1 = Equal<A, B> extends true ? true : false;

// true
type Case2 = Equal<A, Merge<B>> extends true ? true : false;
```

*   知识点：

1.  对象交叉
2.  交叉后的对象 Merge

### 15、实现按类型查找

*   题目：通过在联合类型`Cat | Dog`中搜索公共`type`字段来获取相应的类型。换句话说，在以下示例中，我们期望`LookUp<Dog | Cat, 'dog'>`获得`Dog`，`LookUp<Dog | Cat, 'cat'>`获得`Cat`。

```ts
interface Cat {
  type: 'cat';
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal';
}

interface Dog {
  type: 'dog';
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer';
  color: 'brown' | 'white' | 'black';
}

type MyDog = LookUp<Cat | Dog, 'dog'>; // expected to be `Dog`
```

*   解答：
    这一题也有点贴合实际工作了，借助联合类型的分发特性可以很轻易的实现

```ts
type LookUp<U, T> = U extends { type: T } ? U : never;

// 分发特性
// step1: Cat extends { type: 'dog' } ? Cat : never -> never
// step2: Dog extends { type: 'dog' } ? Dog : never -> Dog
// step3: never | Dog -> Dog
type MyDog = LookUp<Cat | Dog, 'dog'>;
```

*   知识点：泛型下联合类型的分发特性 和 条件表达式

### 彩蛋：大家最爱的两数之和 （看看就好，有点复杂，小心走火入魔）

*   题目： 给定一个整数数组 nums 和一个目标整数 target, 如果 nums 数组中存在两个元素的和等于 target 返回 true, 否则返回 false

*   解答：
    这个题目涉及到了加法，因为ts 没有提供计算的能力，一般都是通过构造辅助元组的方式来进行计数，通过元组的长度来作为结果。那么要实现加法，可以构造两个长度为 A,B 的元组，将元组组合起来，就是加法的结果。

```ts
// 创建长度为 A 的元组
type BuildArrs<
  A extends number,
  Arr extends any[] = [],
> = Arr['length'] extends A ? Arr : BuildArrs<A, [...Arr, 1]>;

// 加法就是将两个元组合并
type Sum<A extends number, B extends number> = [
  ...BuildArrs<A>,
  ...BuildArrs<B>,
]['length'];

// 判断 A 中是否存在一个元素，和 B 相加 = T
type Sums<A extends number[], B extends number, T extends number> = A extends [
  infer F extends number,
  ...infer R extends number[],
]
  ? Sum<F, B> extends T
    ? true
    : Sums<R, B, T>
  : false;

type TwoSum<T extends number[], U extends number> = T extends [
  infer F extends number,
  ...infer R extends number[],
]
  ? // 如果剩余元素中，存在一个元素和 F 相加 = U ，那么就返回true
    Sums<R, F, U> extends true
    ? true
    : // 否则递归剩余元素
      TwoSum<R, U>
  : false;
```

*   知识点：
    1、元组辅助计数
    2、加法实现

![3F99CB9C-CA75-4EBF-9145-413ACC56FED7.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/982be14308a9487787ffdbd1cf8541e8~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5omT5pu05Lq6ZXI=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDA3MjI0Njc5ODQ2MDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1727748062&x-orig-sign=%2Fa5u6cco4%2FT114ja77WA5msjA08%3D)

## <span id="mszt">面试真题50道</span>

*   主要考察TypeScript 语言的各个方面，包括`基本语法`、`类型系统`、`函数`、`类`、`模块化`、`泛型`、`装饰器`等。在面试中，常见的 TypeScript 面试题主要围绕以下几个方面展开：

1、 **类型系统**：考察对 TypeScript 类型系统的理解，包括基本类型、联合类型、交叉类型、接口、类型别名、类型推断、类型守卫等。

2、 **函数和类**：涉及函数参数类型、返回值类型、箭头函数、函数重载、类的定义、继承、访问修饰符等概念。

3、 **泛型**：考察在函数、类和接口中如何使用泛型来增加代码的灵活性和复用性。

4、 **模块化**：问题可能涉及 ES6 模块化的语法、导入导出方式以及模块解析等内容。

5、 **装饰器**：了解对装饰器的使用，包括类装饰器、方法装饰器、属性装饰器以及参数装饰器的定义和应用。

6、**编译配置**：熟悉 tsconfig.json 中的配置选项，包括编译目标、模块系统、严格模式等。

7、**工程化实践**：了解 TypeScript 在项目中的实际应用，如与 JavaScript 的混用、第三方库的声明文件使用、类型声明等。

### 1. 什么是接口（interface），它的作用，接口的使用场景。接口和类型别名（Type Alias）的区别

接口是用于描述对象的形状的结构化类型。它定义了对象应该包含哪些属性和方法。在TypeScript中，接口可以用来约束对象的结构，以提高代码的可读性和维护性。例如：

```ts
interface Person {
    name: string;
    age: number;
}
function greet(person: Person) {
    return `Hello, ${person.name}!`;
}
```

`接口`和`类型别名`的区别：

*   `接口`定义了一个契约，描述了对象的形状（属性和方法），以便在多个地方共享。它可以被类、对象和函数实现。
*   `类型别名`给一个类型起了一个新名字，便于在多处使用。它可以用于原始值、联合类型、交叉类型等。与接口不同，类型别名可以用于原始类型、联合类型、交叉类型等，而且还可以为任意类型指定名字。

### 2. 对 TypeScript 类中成员的 public、private、protected、readonly 修饰符的理解？

> `public`: 成员都默认为`public`，被此限定符修饰的成员是可以被外部访问；\
> `private`: 被此限定符修饰的成员是只可以被类的内部访问；\
> `protected`: 被此限定符修饰的成员是只可以被类的内部以及类的子类访问;\
> `readonly`: 关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。

### 3. 类型声明和类型推断的区别，并举例应用

 类型声明是显式地为变量或函数指定类型，而类型推断是TypeScript根据赋值语句右侧的值自动推断变量的类型。例如：

    ts
     代码解读
    复制代码
    // 类型声明
    let x: number;
    x = 10;
    // 类型推断
    let y = 20; // TypeScript会自动推断y的类型为number

### 4. 什么是泛型（generic），如何创建泛型函数和泛型类，实际用途

`泛型`是一种在定义函数、类或接口时使用类型参数的方式，以增加代码的灵活性和重用性。在TypeScript中，可以使用来创建泛型。例如：

```ts
function identity<T>(arg: T): T {
    return arg;
}
// 调用泛型函数
let output = identity<string>("hello");
```

### 5. 枚举（enum）是什么，它的优势，应用案例。枚举和常量枚举的区别

枚举是一种对数字值集合进行命名的方式。它们可以增加代码的可读性，并提供一种便捷的方式来使用一组有意义的常量。例如：

```ts
enum Color {
    Red,
    Green,
    Blue
}

let selectedColor: Color = Color.Red;
```

枚举和常量枚举的区别:

*   `枚举`可以包含计算得出的值，而常量枚举则在编译阶段被删除，并且不能包含计算得出的值，它只能包含常量成员。
*   `常量枚举`在编译后会被删除，而普通枚举会生成真实的对象。

### 6. 如何处理可空类型（nullable types）和undefined类型，如何正确处理这些类型以避免潜在错误

在TypeScript中，可空类型是指一个变量可以存储特定类型的值，也可以存储`null`或`undefined`。（通过使用可空类型，开发者可以明确表达一个变量可能包含特定类型的值，也可能不包含值（即为`null`或`undefined`）。这有助于提高代码的可读性，并使得变量的可能取值范围更加清晰明了）。

为了声明一个可空类型，可以使用联合类型（Union Types），例如 `number | null` 或 `string | undefined`。 例如：

```ts
let numberOrNull: number | null = 10; 
numberOrNull = null; // 可以赋值为null 
    
let stringOrUndefined: string | undefined = "Hello"; 
stringOrUndefined = undefined; // 可以赋值为undefined
```

### 7. 什么是联合类型和交叉类型

`联合类型`表示一个值可以是多种类型中的一种，而`交叉类型`表示一个新类型，它包含了多个类型的特性。

*   联合类型示例：

```ts
// typescript
let myVar: string | number;
myVar = "Hello"; // 合法
myVar = 123; // 合法
```

*   交叉类型示例：

```ts
interface A {
  a(): void;
}
interface B {
  b(): void;
}
type C = A & B; // 表示同时具备 A 和 B 的特性
```

### 8. 什么是TypeScript中的声明文件（Declaration Files）

声明文件（通常以 `.d.ts` 扩展名结尾）用于描述已有 JavaScript 代码库的类型信息。它们提供了类型定义和元数据，以便在 TypeScript 项目中使用这些库时获得智能感知和类型安全。

### 9. 什么是命名空间（Namespace）和模块（Module） 

`模块`

*   在一个大型项目中，可以将相关的代码组织到单独的文件，并使用模块来导入和导出这些文件中的功能。
*   在一个 Node.js 项目中，可以使用 import 和 export 关键字来创建模块，从而更好地组织代码并管理依赖关系。

`命名空间`

*   在面向对象的编程中，命名空间可以用于将具有相似功能或属性的类、接口等进行分组，以避免全局命名冲突。
*   这在大型的 JavaScript 或 TypeScript 应用程序中特别有用，可以确保代码结构清晰，并且不会意外地重复定义相同的名称。

`模块`提供了一种组织代码的方式，使得我们可以轻松地在多个文件中共享代码，

`命名空间`则提供了一种在全局范围内组织代码的方式，防止命名冲突。

模块示例:

```ts
// greeter.ts
export function sayHello(name: string) {
  return `Hello, ${name}!`;
}
// app.ts
import { sayHello } from './greeter';
console.log(sayHello('John'));
```

命名空间示例:

```ts
// greeter.ts
namespace Greetings {
  export function sayHello(name: string) {
    return `Hello, ${name}!`;
  }
}
// app.ts
<reference path="greeter.ts" />
console.log(Greetings.sayHello('John'));
```

在上面的示例中：

*   使用模块时，我们可以使用 `export` 和 `import` 关键字来定义和引入模块中的函数或变量。
*   而在命名空间中，我们使用 namespace 来创建命名空间，并且需要在使用之前使用 ` <reference path="file.ts" /> `来引入命名空间。

### 10. 什么是类型断言（Type Assertion）

类型断言允许程序员手动指定一个值的类型。这在需要明确告诉编译器某个值的类型时非常有用。

```ts
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

### 11. TypeScript中的可选参数和默认参数是什么

*   可选参数允许函数中的某些参数不传值，在参数后面加上问号`?`表示可选。
*   默认参数允许在声明函数时为参数指定`默认值`，这样如果调用时未提供参数值，则会使用默认值。

可选参数示例：

```ts
function greet(name: string, greeting?: string) {
  if (greeting) {
    return `${greeting}, ${name}!`;
  } else {
    return `Hello, ${name}!`;
  }
}
```

默认参数示例：

```ts
function greet(name: string, greeting: string = "Hello") {
  return `${greeting}, ${name}!`;
}
```

### 12. 类型守卫（Type Guards）是什么

类型守卫是一种用于在运行时检查类型的技术，它允许开发人员在特定的作用域内缩小变量的范围，以确保正确推断类型。

```ts
function isString(test: any): test is string {
  return typeof test === "string";
}
if (isString(input)) {
  // input 在此代码块中被收窄为 string 类型
}
```

### 13. 索引类型（Index Types）是什么，好处有什么

索引类型允许我们在 TypeScript 中创建具有动态属性名称的对象，并且能够根据已知的键来获取相应的属性类型。 好处：

**1.动态属性访问**

> 在处理动态属性名的对象时，可以使用索引类型来实现类型安全的属性访问。例如，当从服务器返回的 JSON 数据中提取属性时，可以利用索引类型来确保属性名存在并获取其对应的类型。

**2.代码重用**

> 当需要创建通用函数来操作对象属性时，索引类型可以帮助我们实现更加通用和灵活的代码。例如，一个通用的函数可能需要根据传入的属性名称获取属性值，并进行特定的处理。

```ts
interface ServerData {
  id: number;
  name: string;
  age: number;
  // 可能还有其他动态属性
}
function getPropertyValue(obj: ServerData, key: keyof ServerData): void {
  console.log(obj[key]); // 确保 obj[key] 的类型是正确的 // 这里可以直接使用索引类型来获取属性值
}
```

**3.动态扩展对象**

> 当需要处理来自外部来源（比如 API 响应或数据库查询）的动态数据时，索引类型可以让我们轻松地处理这种情况，而不必为每个可能的属性手动定义类型。

```ts
interface DynamicObject {
  [key: string]: number | string; // 允许任意属性名，但属性值必须为 number 或 string 类型

}
function processDynamicData(data: DynamicObject): void {
  for (let key in data) {
    console.log(key + ": " + data[key]); // 对任意属性进行处理
  }
}
```

**4.类型安全性**

> 索引类型可以增强代码的类型安全性，因为它们可以捕获可能的属性名拼写错误或键不存在的情况。

**5.映射类型**

> TypeScript 还提供了映射类型（Mapped Types）的概念，它们利用索引类型可以根据现有类型自动生成新类型。这在创建新类型时非常有用，特别是当需要在现有类型的基础上添加或修改属性时。

### 14. const和readonly的区别

当在TypeScript中使用`const`和`readonly`时，它们的行为有一些显著的区别：

*   **const：**

    *   `const`用于声明常量值。一旦被赋值后，其值将不能被重新赋值或修改。
    *   常量必须在声明时就被赋值，并且该值不可改变。
    *   常量通常用于存储不会发生变化的值，例如数学常数或固定的配置值。

```ts
const PI = 3.14;
PI = 3.14159; // Error: 无法重新分配常量
```

*   **readonly：**

    *   `readonly`关键字用于标记类的属性，表明该属性只能在类的构造函数或声明时被赋值，并且不能再次被修改。
    *   `readonly`属性可以在声明时或构造函数中被赋值，但之后不能再被修改。
    *   `readonly`属性通常用于表示对象的某些属性是只读的，防止外部代码修改这些属性的值。

```ts
class Person {
    readonly name: string;

    constructor(name: string) {
        this.name = name; // 可以在构造函数中赋值
    }
}

let person = new Person("Alice");
person.name = "Bob"; // Error: 无法分配到"name"，因为它是只读属性
```

总结来说，`const`主要用于声明常量值，而`readonly`则用于标记类的属性使其只读。

### 15. TypeScript 中 any 类型的作用是什么，滥用会有什么后果

在TypeScript中，`any`类型的作用是允许我们在编写代码时不指定具体的类型，从而可以接受任何类型的值。使用`any`类型相当于放弃了对该值的静态类型检查，使得代码在编译阶段不会对这些值进行类型检查。

主要情况下，`any`类型的使用包括以下几点：

*   当我们不确定一个变量或表达式的具体类型时，可以使用any类型来暂时绕过类型检查。
*   在需要与动态类型的JavaScript代码交互时，可以使用any类型来处理这些动态类型的值。
*   有时候某些操作难以明确地定义其类型，或者需要较复杂的类型推导时，也可以使用any类型。

**滥用的后果：**

尽管any类型提供了灵活性，但由于它会放弃TypeScript的静态类型检查，因此滥用any类型可能会降低代码的健壮性和可维护性。当滥用`any`类型时，可能会导致以下后果：

**1.代码可读性下降：**

```ts
let data: any;
// 代码中的使用方式
data.someUnknownMethod(); // 在编译阶段不会报错，但实际上可能是一个错误
```

**2.潜在的运行时错误：**

```ts
let myVariable: any = 123;
myVariable.toUpperCase(); // 在编译阶段不会报错，但在运行时会引发错误
```

**3.类型安全受损：**

```ts
function add(x: any, y: any): any {
    return x + y; // 编译器无法推断返回值的具体类型
}
```

滥用`any`类型会导致代码失去了TypeScript强大的类型检查功能，带来了如下问题：

*   可能引入未知的运行时行为和错误。
*   降低了代码的可维护性和可读性，因为难以理解某些变量或参数的具体类型。

因此，在实际开发中，应尽量避免过度使用`any`类型。可以通过合适的类型声明、接口定义和联合类型等方式，提高代码的健壮性和可维护性。

### 16. TypeScript中的this有什么需要注意的

在TypeScript中，与JavaScript相比，`this`的行为基本上是一致的。然而，TypeScript提供了类型注解和类型检查，可以帮助开发者更容易地理解和处理`this`关键字的使用。

> 在noImplicitThis为true 的情况下，必须声明 this 的类型，才能在函数或者对象中使用this。
>
> Typescript中箭头函数的 this 和 ES6 中箭头函数中的 this 是一致的。

在TypeScript中，当将`noImplicitThis`设置为`true`时，意味着在函数或对象中使用this时，必须显式声明`this`的类型。这一设置可以帮助开发者更明确地指定this的类型，以避免因为隐式的`this`引用而导致的潜在问题。

具体来说，如果将`noImplicitThis`设置为`true`，则在下列情况下必须显式声明this的类型：

*   在函数内部使用this时，需要使用箭头函数或显示绑定this。
*   在某些类方法或对象方法中，需要明确定义this的类型。

示例代码如下所示：

```ts
class MyClass {
  private value: number = 42;

  public myMethod(this: MyClass) {
    console.log(this.value);
  }

  public myMethod2 = () => {
    console.log(this.value);
  }
}

let obj = new MyClass();
obj.myMethod(); // 此处必须传入合适的 this 类型
```

通过将`noImplicitThis`设置为`true`，TypeScript要求我们在使用`this`时明确指定其类型，从而在编译阶段进行更严格的类型检查，帮助避免一些可能出现的错误和不确定性。

注：`noImplicitThis`是TypeScript编译器的一个配置选项，用于控制在函数或对象方法中使用`this`时的严格性。当将`noImplicitThis`设置为`true`时，意味着必须显式声明`this`的类型，否则会触发编译错误。

### 17. TypeScript数据类型

在TypeScript中，常见的数据类型包括以下几种：

*   **基本类型**：

    *   `number`: 表示数字，包括整数和浮点数。
    *   `string`: 表示文本字符串。
    *   `boolean`: 表示布尔值，即`true`或`false`。
    *   `null`、`undefined`: 分别表示null和undefined。
    *   `symbol`: 表示唯一的、不可变的值。

*   **复合类型**：

    *   `array`: 表示数组，可以使用`number[]`或`Array<number>`来声明其中元素的类型。
    *   `tuple`: 表示元组，用于表示固定数量和类型的数组。
    *   `enum`: 表示枚举类型，用于定义具名常量集合。

*   **对象类型**：

    *   `object`: 表示非原始类型，即除number、string、boolean、symbol、null或undefined之外的类型。
    *   `interface`: 用于描述对象的结构，并且可以重复使用。

*   **函数类型**：

    *   `function`: 表示函数类型。
    *   `void`: 表示函数没有返回值。
    *   `any`: 表示任意类型。

*   **高级类型**：

    *   `union types`: 表示一个值可以是几种类型之一。
    *   `intersection types`: 表示一个值同时拥有多种类型的特性。

### 18. interface可以给Function/Array/Class（Indexable)做声明吗

在TypeScript中，`interface`可以用来声明函数、数组和类（具有索引签名的类）。下面是一些示例代码：

**1. Interface 声明函数**

```ts
interface MyFunc {
  (x: number, y: number): number;
}

let myAdd: MyFunc = function(x, y) {
  return x + y;
};
```

在上述示例中，`MyFunc`接口描述了一个函数类型，该函数接受两个参数并返回一个数字。

**2. Interface 声明数组**

```ts
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Alice"];
```

上面的示例中，`StringArray`接口描述了一个具有数字索引签名的字符串数组。意味着我们可以通过数字索引来访问数组元素。

**3. Interface 声明类（Indexable）**

```ts
interface StringDictionary {
  [index: string]: string;
}

let myDict: StringDictionary = {
  "name": "John",
  "age": "30"
};
```

在这个例子中，`StringDictionary`接口用于描述具有字符串索引签名的类或对象。这使得我们可以像操作字典一样使用对象的属性。

综上：TypeScript中的`interface`可以被用来声明函数、数组和具有索引签名的类，从而帮助我们定义和限定这些数据结构的形式和行为。

### 19. TypeScript中的协变、逆变、双变和抗变是什么

在TypeScript中，`协变（Covariance）`、`逆变（Contravariance）`、`双变（Bivariance）`和`抗变（Invariance` 是与类型相关的概念，涉及到参数类型的子类型关系。下面对这些概念进行解释，并提供示例代码。

**协变（Covariance）**

*   **区别**：协变意味着子类型可以赋值给父类型。
*   **应用场景**：数组类型是协变的，因此可以将子类型的数组赋值给父类型的数组。

`协变`表示类型T的子类型可以赋值给类型U，当且仅当T是U的子类型。在TypeScript中，`数组`是协变的，这意味着可以将子类型的数组赋值给父类型的数组。

```ts
let subtypes: string[] = ["hello", "world"];
let supertype: Object[] = subtypes; // 数组是协变的，这是合法的
```

**逆变（Contravariance）**

*   **区别**：逆变意味着超类型可以赋值给子类型。
*   **应用场景**：函数参数类型是逆变的，因此可以将超类型的函数赋值给子类型的函数。

`逆变`表示类型T的超类型可以赋值给类型U，当且仅当T是U的子类型。在TypeScript中，`函数参数`是逆变的，这意味着可以将超类型的函数赋值给子类型的函数。

```ts
type Logger<T> = (arg: T) => void;
let logNumber: Logger<number> = (x: number) => console.log(x);
let logAny: Logger<any> = logNumber; // 函数参数是逆变的，这是合法的
```

**双变（Bivariance）**

*   **区别**：双变允许参数类型既是协变又是逆变的。
*   **应用场景**：对象类型是双变的，这意味着可以将子类型的对象赋值给父类型的对象，同时也可以将超类型的对象赋值给子类型的对象。

`双变`允许参数类型既是`协变`又是`逆变`的。在TypeScript中，`普通对象类型`是双变的，这意味着可以将子类型的对象赋值给父类型的对象，并且可以将超类型的对象赋值给子类型的对象。

```ts
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

let animal: Animal = { name: "Animal" };
let dog: Dog = { name: "Dog", breed: "Labrador" };

animal = dog; // 对象类型是双变的，这是合法的
dog = animal; // 对象类型是双变的，这也是合法的
```

**抗变（Invariance）**

*   **区别**：抗变表示不允许类型之间的任何赋值关系。
*   **应用场景**：通常情况下，基本类型和类类型是抗变的。

`抗变`表示不允许类型T和U之间的任何赋值关系，即T既不是U的子类型，也不是U的超类型。在TypeScript中，一般情况下，`基本类型`和`类类型`是抗变的。

```ts
let x: string = "hello";
let y: string = x; // 这是合法的

let a: Animal = { name: "Animal" };
let b: Animal = a; // 这也是合法的
```

### 20. TypeScript中的静态类型和动态类型有什么区别

*   `静态类型`是在 **编译期间** 进行类型检查，可以在编辑器或 IDE 中发现大部分类型错误。
*   `动态类型`是在 **运行时** 才确定变量的类型，通常与动态语言相关联。

**静态类型（Static Typing）**

*   **定义**：静态类型是指在编译阶段进行类型检查的类型系统，通过类型注解或推断来确定变量、参数和返回值的类型。
*   **特点**：静态类型能够在编码阶段就发现大部分类型错误，提供了更好的代码健壮性和可维护性。
*   **优势**：可以在编辑器或 IDE 中实现代码提示、自动补全和类型检查，帮助开发者减少错误并提高代码质量。

**动态类型（Dynamic Typing）**

*   **定义**：动态类型是指在运行时才确定变量的类型，通常与动态语言相关联，允许同一个变量在不同时间引用不同类型的值。
*   **特点**：动态类型使得变量的类型灵活多变，在运行时可以根据上下文或条件动态地改变变量的类型。
*   **优势**：动态类型可以带来更大的灵活性，适用于一些需要频繁变化类型的场景。

**区别总结**

*   **时机差异**：静态类型在编译期间进行类型检查，而动态类型是在运行时才确定变量的类型。
*   **代码稳定性**：静态类型有助于在编码阶段发现大部分类型错误，提高代码稳定性；动态类型对类型的要求较为灵活，但可能增加了代码的不确定性。
*   **使用场景**：静态类型适合于大型项目和团队，能够提供更强的类型安全性；动态类型适用于快速原型开发和灵活多变的场景，能够更快地迭代和测试代码。

### 21. 介绍TypeScript中的可选属性、只读属性和类型断言

*   **可选属性** 使用 `?` 来标记一个属性可以存在，也可以不存在。
*   **只读属性** 使用 `readonly` 关键字来标记一个属性是只读的。
*   **类型断言** 允许将一个实体强制指定为特定的类型，使用 `<Type>` 或 `value as Type`。

**代码示例：**

```ts
// 可选属性
interface Person {
  name: string;
  age?: number; // 可选属性
}

// 只读属性
interface Point {
  readonly x: number;
  readonly y: number;
}
let p1: Point = { x: 10, y: 20 };
p1.x = 5; // Error: 只读属性无法重新赋值

// 类型断言
let someValue: any = "hello";
let strLength: number = (someValue as string).length;
```

### 22. TypeScript 中的模块化是如何工作的，举例说明

**答案：**

*   TypeScript 中使用 ES6 模块系统，可以使用 `import` 和 `export` 关键字来导入和导出模块。
*   可以通过 `export default` 导出默认模块，在导入时可以使用 `import moduleName from 'modulePath'`。

**代码示例：**

```ts
// math.ts
export function sum(a: number, b: number): number {
  return a + b;
}
export function subtract(a: number, b: number): number {
  return a - b;
}

// app.ts
import { sum, subtract } from './math';
console.log(sum(3, 5)); // 输出 8
```

### 23. 如何约束泛型参数的类型范围

可以使用泛型约束（`extends关键字`）来限制泛型参数的类型范围，确保泛型参数符合某种特定的条件。

**代码示例：**

```ts
interface Lengthwise {
  length: number;
}
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
loggingIdentity({length: 10, value: 3});  // 参数满足 Lengthwise 接口要求，可以正常调用
```

### 24. 什么是泛型约束中的 keyof 关键字，举例说明其用法。

*   `keyof` 是 TypeScript 中用来获取对象类型所有键（属性名）的操作符。
*   可以使用 `keyof` 来定义泛型约束，限制泛型参数为某个对象的键。

**代码示例：**

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
let x = { a: 1, b: 2, c: 3 };
getProperty(x, "a"); // 正确
getProperty(x, "d"); // 错误：Argument of type '"d"' is not assignable to parameter of type '"a" | "b" | "c"'
```

### 25. 什么是条件类型（conditional types），能够举例说明其使用场景吗

*   条件类型是 TypeScript 中的高级类型操作符，可以根据一个类型关系判断结果类型。
*   例如，可以使用条件类型实现一个类型过滤器，根据输入类型输出不同的结果类型。

**代码示例：**

```ts
type NonNullable<T> = T extends null | undefined ? never : T;
type T0 = NonNullable<string | null>;  // string
type T1 = NonNullable<string | null | undefined>;  // string
type T2 = NonNullable<string | number | null>;  // string | number
```

### 25. 什么是装饰器，有什么作用，如何在TypeScript中使用类装饰器

*   `装饰器`是一种特殊类型的声明，可以附加到类、方法、访问符、属性或参数上，以修改其行为。
*   在 TypeScript 中，装饰器提供了一种在声明时定义如何处理类的方法、属性或参数的机制。

**如何在 TypeScript 中使用类装饰器：**

```ts
function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    newProperty = "new property";
    hello = "override";
  };
}

@classDecorator
class Greeter {
  property = "property";
  hello: string;
  constructor(m: string) {
    this.hello = m;
  }
}
console.log(new Greeter("world")); // 输出 { property: 'property', hello: 'override', newProperty: 'new property' }
```

### 26. 类装饰器和方法装饰器的执行顺序是怎样的

*   当有`多个装饰器应用于同一个声明`时（比如一个类中的方法），它们将按照`自下而上`的顺序应用。
*   对于`方法装饰器`，从顶层方法开始`依次向下` `递归调用`方法装饰器函数。

### 27. 装饰器工厂是什么，请给出一个装饰器工厂的使用示例

*   `装饰器工厂`是一个返回装饰器的函数。它可以接受参数，并根据参数动态生成装饰器。

**以下是一个简单的装饰器工厂示例：**

```ts
function color(value: string) {
  return function (target: any, propertyKey: string) {
    // ... 在此处使用 value 和其他参数来操作装饰目标
  };
}

class Car {
  @color('red')
  brand: string;
}
```

### 28. 为什么要使用 TypeScript ? TypeScript 相对于 JavaScript 的优势是什么？

> 增加了静态类型，可以在开发人员编写脚本时检测错误，使得代码质量更好，更健壮。\
> 优势:
>
> 1.  杜绝手误导致的变量名写错;
> 2.  类型可以一定程度上充当文档;
> 3.  IDE自动填充，自动联想;

### 29. TypeScript 中 const 和 readonly 的区别？枚举和常量枚举的区别？接口和类型别名的区别？

> `const 和 readonly`: const可以防止变量的值被修改，readonly可以防止变量的属性被修改。\
> `枚举和常量枚举`: 常量枚举只能使用常量枚举表达式，并且不同于常规的枚举，它们在编译阶段会被删除。 常量枚举成员在使用的地方会被内联进来。 之所以可以这么做是因为，常量枚举不允许包含计算成员。\
> `接口和类型别名`: 两者都可以用来描述对象或函数的类型。与接口不同，类型别名还可以用于其他类型，如基本类型（原始值）、联合类型、元组。

### 30. TypeScript 中 any、never、unknown、null & undefined 和 void 有什么区别？

> `any`: 动态的变量类型（失去了类型检查的作用）。\
> `never`: 永不存在的值的类型。例如：never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。\
> `unknown`: 任何类型的值都可以赋给 unknown 类型，但是 unknown 类型的值只能赋给 unknown 本身和 any 类型。\
> `null & undefined`: 默认情况下 null 和 undefined 是所有类型的子类型。 就是说你可以把 null 和 undefined 赋值给 number 类型的变量。当你指定了 --strictNullChecks 标记，null 和 undefined 只能赋值给 void 和它们各自。\
> `void`: 没有任何类型。例如：一个函数如果没有返回值，那么返回值可以定义为void。

### 31. 数组定义的两种方式

> ```ts
> type Foo= Array<string>;
> interface Bar { 
>      baz: Array<{ name: string, age: number}>
> }
>
> type Foo = string[];
> interface Bar { 
>      baz : { name: string, age: number }[] 
> }
> ```

### 32. TypeScript 中 interface 可以给 Function / Array / Class（Indexable）做声明吗？

> ```ts
> /* 可以 */
> // 函数声明
> interface Say {
>  (name: string): viod;
> }
> let say: Say = (name: string):viod => {}
> // Array 声明
> interface NumberArray { 
>  [index: number]: number; 
> } 
> let fibonacci: NumberArray = [1, 1, 2, 3, 5];
> // Class 声明
> interface PersonalIntl {
>  name: string
>  sayHi (name: string): string
> }
> ```

### 33. TypeScript 中可以使用 String、Number、Boolean、Symbol、Object 等给类型做声明吗？

> ```ts
> /* 可以 */
> let name: string = "bob";
> let decLiteral: number = 6;
> let isDone: boolean = false;
> let sym: symbol = Symbol();
> interface Person {
>  name: string;
>  age: number;
> }
> ```

### 34. TypeScript 中的 this 和 JavaScript 中的 this 有什么差异？

> 1.  TypeScript：noImplicitThis: true 的情况下，必须去声明 this 的类型，才能在函数或者对象中使用this。
> 2.  Typescript 中箭头函数的 this 和 ES6 中箭头函数中的 this 是一致的。

### 35. TypeScript 中使用 Union Types 时有哪些注意事项？

> **属性或方法访问**: 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法。
>
> ```ts
> function getLength(something: string | number): number {
>    return something.length;
> }
> // index.ts(2,22): error TS2339: Property 'length' does not exist on type >'string | number'.
> //   Property 'length' does not exist on type 'number'.
>
> function getString(something: string | number): string {
>    return something.toString();
> }
> // 公共方法和属性可以访问
> ```

### 36. TypeScript 如何设计 Class 的声明？

> ```ts
> class Greeter {
>    greeting: string;
>    constructor(message: string) {
>        this.greeting = message;
>    }
>    greet(): string{
>        return "Hello, " + this.greeting;
>    }
> }
> let greeter = new Greeter("world");
> // 在声明类的时候，一般类中都会包含，构造函数、对构造函数中的属性进行类型声明、类中的方法。
> ```

### 37. TypeScript 中如何联合枚举类型的 Key?

> ```ts
> enum str {
>    A,
>    B,
>    C
> }
> type strUnion =  keyof typeof str; // 'A' | 'B' | 'C'
> ```

### 38. TypeScript 中 type 和 interface 的区别?

> 相同点：
>
> 1.  都可以描述 '对象' 或者 '函数'
> 2.  都允许拓展(extends)
>
> 不同点：
>
> 1.  type 可以声明基本类型，联合类型，元组
>
> 2.  type 可以使用 typeof 获取实例的类型进行赋值
>
> 3.  多个相同的 interface 声明可以自动合并
>
> 使用 interface 描述‘数据结构’，使用 type 描述‘类型关系’

### 39. TypeScript 中 ?.、??、!、!.、\_、\*\* 等符号的含义？

> `?. 可选链` 遇到 null 和 undefined 可以立即停止表达式的运行。\
> `?? 空值合并运算符` 当左侧操作数为 null 或 undefined 时，其返回右侧的操作数，否则返回左侧的操作数。\
> `! 非空断言运算符` x! 将从 x 值域中排除 null 和 undefined\
> `!. `在变量名后添加，可以断言排除undefined和null类型\
> `_ 数字分割符` 分隔符不会改变数值字面量的值，使人更容易读懂数字 .e.g 1\_101\_324。\
> `** `求幂

### 40. 简单介绍一下 TypeScript 模块的加载机制？

> 假设有一个导入语句 `import { a } from "moduleA"`;
>
> 1.  首先，编译器会尝试定位需要导入的模块文件，通过绝对或者相对的路径查找方式；
> 2.  如果上面的解析失败了，没有查找到对应的模块，编译器会尝试定位一个`外部模块声明`（.d.ts）；
> 3.  最后，如果编译器还是不能解析这个模块，则会抛出一个错误 `error TS2307: Cannot find module 'moduleA'.`

### 41. 简单聊聊你对 TypeScript 类型兼容性的理解？

> `ts 类型兼容：` 当一个类型 Y 可以赋值给另一个类型 X 时， 我们就可以说类型 X 兼容类型 Y。也就是说两者在结构上是一致的，而不一定非得通过 extends 的方式继承而来\
> `接口的兼容性：X = Y `只要目标类型 X 中声明的属性变量在源类型 Y 中都存在就是兼容的（ Y 中的类型可以比 X 中的多，但是不能少）\
> `函数的兼容性：X = Y `Y 的每个参数必须能在 X 里找到对应类型的参数，参数的名字相同与否无所谓，只看它们的类型（参数可以少但是不能多。与接口的兼容性有区别，原因参考第 17 问）

### 42. 协变、逆变、双变和抗变的理解？

> `协变：X = Y `Y 类型可以赋值给 X 类型的情况就叫做协变，也可以说是 X 类型兼容 Y 类型
>
>     typescript
>      代码解读
>     复制代码
>     interface X { name: string; age: number; } 
>     interface Y { name: string; age: number; hobbies: string[] }
>     let x: X = { name: 'xiaoming', age: 16 }
>     let y: Y = { name: 'xiaohong', age: 18, hobbies: ['eat'] }
>     x = y
>
> `逆变：printY = printX` 函数X 类型可以赋值给函数Y 类型，因为函数Y 在调用的时候参数是按照Y类型进行约束的，但是用到的是函数X的X的属性和方法，ts检查结果是类型安全的。这种特性就叫做逆变，函数的参数有逆变的性质。
>
> ```ts
> let printY: (y: Y) => void
> printY = (y) => { console.log(y.hobbies) }
> let printX: (x: X) => void
> printX = (x) => { console.log(x.name) }
> printY = printX
> ```
>
> `双变（双向协变）：X = Y；Y = X`父类型可以赋值给子类型，子类型可以赋值给父类型，既逆变又协变，叫做“双向协变”（ts2.x 之前支持这种赋值，之后 ts 加了一个编译选项 strictFunctionTypes，设置为 true 就只支持函数参数的逆变，设置为 false 则支持双向协变）\
> `抗变（不变）：`非父子类型之间不会发生型变，只要类型不一样就会报错

### 43. TypeScript 中对象展开会有什么副作用吗？

> 1.  展开对象后面的属性会覆盖前面的属性；
> 2.  仅包含对象自身的可枚举属性，不可枚举的属性将会丢失。

### 44. 类型的全局声明和局部声明

> 如果声明文件内不包含`import、export`，那么这个文件声明的类型就会变成全局声明。反之，若是这个文件包含了`import、export`，那么这个文件包含的类型声明则会是局部声明，不会影响到全局声明。

### 45. TypeScript 中同名的 interface 或者同名的 interface 和 class 可以合并吗？

> 同名的interface会自动合并，同名的interface和class会自动聚合。

### 46. 如何使 TypeScript 项目引入并识别编译为 JavaScript 的 npm 库包？

> 1.  选择安装 ts 版本，`npm install @types/包名 --save`；
> 2.  对于没有类型的 js 库，需要编写同名的.d.ts文件

### 47. TypeScript 的 tsconfig.json 中有哪些配置项信息？

> ```json
> {
>   "files": [],
>   "include": [],
>   "exclude": [],
>   "compileOnSave": false,
>   "extends": "",
>   "compilerOptions": { ... }
> }
> ```
>
> `files` 是一个数组列表，里面包含指定文件的相对或绝对路径，用来指定待编译文件，编译器在编译的时候只会编译包含在files中列出的文件。\
> `include & exclude` 指定编译某些文件，或者指定排除某些文件。\
> `compileOnSave：true` 让IDE在保存文件的时候根据tsconfig.json重新生成文件。\
> `extends` 可以通过指定一个其他的tsconfig.json文件路径，来继承这个配置文件里的配置。\
> `compilerOptions` 编译配置项，如何对具体的ts文件进行编译

### 48. TypeScript 中如何设置模块导入的路径别名？

> 通过 tsconfig.json 中的 paths 项来配置:
>
> ```json
> { 
>   "compilerOptions": 
>     {
>       "baseUrl": ".", 
>       "paths": { 
>          "@helper/*": ["src/helper/*"], 
>          "@utils/*": ["src/utils/*"], 
>          ... 
>       } 
>    } 
> }
> ```

### 49. declare，declare global是什么？

> `declare` 是用来定义全局变量、全局函数、全局命名空间、js modules、class等\
> `declare global` 为全局对象 `window` 增加新的属性
>
> ```ts
> declare global { 
>    interface Window { 
>         csrf: string; 
>    }
> }
> ```

### 50. 简述工具类型 `Exclude`、`Omit`、`Merge`、`Intersection`、`Overwrite`的作用。

> `Exclude<T, U>` 从 `T` 中排除出可分配给 `U`的元素。\
> `Omit<T, K>` 的作用是忽略`T`中的某些属性。\
> `Merge<O1, O2>` 是将两个对象的属性合并。\
> `Compute<A & B>` 是将交叉类型合并\
> `Intersection<T, U>`的作用是取`T`的属性,此属性同样也存在与`U`。\
> `Overwrite<T, U>` 是用`U`的属性覆盖`T`的相同属性。

### 参考链接

[🌝重学 TS](https://juejin.cn/post/7211358106629750841?searchId=20240821103748901EA88DF3832F3F7272) <br>
[TS 入门完全指南](https://juejin.cn/post/7215796935298596920?searchId=20240821103748901EA88DF3832F3F7272) <br>
[《TS 类型挑战通关手册》](https://blog.maxiaobo.com.cn/type-challenge/dist/)

### 结尾

    看到这里相信大家应对TS有更多的了解，想要整花活，可以去[type-challenges](https://github.com/type-challenges/type-challenges)瞅瞅，只有你想不到，没有TS做不到。最后如果本文对各位看官老爷有帮助，劳烦动动发财的小手点个赞，感谢❤️。
