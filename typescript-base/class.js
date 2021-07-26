class Animal {
  constructor(name) {
    this.name = name
  }

  run() {
    return `${this.name} is running`
  }
}
const snake = new Animal('lily')
console.log(snake.run())


class Dog extends Animal {
  bark() {
    return `${this.name} is barking`
  }
}

const xiaobao = new Dog('xiaobao')
console.log(xiaobao.run())
console.log(xiaobao.bark())

class Cat extends Animal {
  // 不需要实例化， 直接访问类上的静态属性
  static categories = ['mammal']
  constructor(name) {
    super(name)
    console.log(this.name)
  }

  run() {
    return "Meow, " + super.run()
  }
}

const maomao = new Cat('maomao')
console.log(maomao.run())
console.log(Cat.categories)