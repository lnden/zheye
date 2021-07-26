// public: 修改的属性或方法是共有的
// private：修饰的属性或方法是私有的
// 1.子类也没办法访问
// protected：修饰的属性或方法是受保护的
// 1.子类可以访问(我和我的子女可以访问)

class Animal {
  readonly name: string
  constructor(name) {
    this.name = name
  }
  protected run() {
    return `${this.name} is running`
  }
}
const snake = new Animal('lily')
snake.name = '123'
console.log(snake.run())

// 继承的特性
class Dog extends Animal {
  bark() {
    return `${this.name} is barking`
  }
}
const xiaobao = new Dog('xiaobao')
console.log(xiaobao.run())


// 重写构造函数，注意在子类的构造函数中，必须使用 super 调用父类的方法，要不就会报错。
class Cat extends Animal {
  static categories = ['mammal']
  constructor(name) {
    super(name)
    console.log(this.name)
  }
  run() {
    return 'Meow, ' + super.run()
  }
}
const maomao = new Cat('maomao')
console.log(maomao.run())
console.log(Cat.categories)