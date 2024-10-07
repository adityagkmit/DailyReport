// 2. Factory method pattern


// BAD CODE
class Add {
    constructor(a, b){
        this.addition = a+b;
    }
    add(){
        console.log(this.addition);
    }
}

class Sub {
    constructor(a, b){
        this.subtraction = a-b;
    }
    sub(){
        console.log(this.subtraction);
    }
}

const ans = new Add(24, 13);
ans.add();
const result = new Sub(24,13);
result.sub();


// GOOD CODE


class Add {
    constructor(a, b){
        this.addition = a+b;
    }
    getAns(){
        console.log(this.addition);
    }
}


class Sub {
    constructor(a, b){
        this.subtraction = a-b;
    }
    getAns(){
        console.log(this.subtraction);
    }
}


class MathFactory {
    static math(operation, a, b){
        switch (operation){
            case 'Add':
        return new Add(a,b);
            case 'Sub':
        return new Sub(a,b);
            break;
        }
    }
}
const add1 = MathFactory.math("Add", 24, 13);
add1.getAns();
const sub1 = MathFactory.math("Sub", 24, 13);
sub1.getAns();