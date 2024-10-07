// 1. Singleton pattern


// bad code 
class BadSingleton {
  static getInstance(){
    return new BadSingleton()
  }
}
const s1 = BadSingleton.getInstance();
const s2 = BadSingleton.getInstance();
console.log(s1 === s2); // false


// good code
class Singleton {
  static getInstance(){
    if(!this.instance){
      this.instance = new Singleton()
    }
    return this.instance
  }
}

const s1 = Singleton.getInstance();
const s2 = Singleton.getInstance();
console.log(s1 === s2); // true


