// 2. ShoppingCart (Violation: Open/Closed Principle)

// Bad Code
class ShoppingCart {
    calculateTotal(items) {
        let total = 0;
        items.forEach(item => {
            if (item.type === 'book') {
                total += item.price * 0.9; // 10% discount on books
            } else if (item.type === 'electronics') {
                total += item.price;
            }
        });
        return total;
    }
}

// Usage
const cart = new ShoppingCart();
const items = [{ type: 'book', price: 100 }, { type: 'electronics', price: 200 }];
console.log(cart.calculateTotal(items)); // Output: 290

// Good Code
class Item {
    constructor(price) {
        this.price = price;
    }

    getPrice() {
        throw new Error("Method 'getPrice()' must be implemented.");
    }
}

class Book extends Item {
    getPrice() {
        return this.price * 0.9; // 10% discount
    }
}

class Electronics extends Item {
    getPrice() {
        return this.price;
    }
}

class ShoppingCart {
    calculateTotal(items) {
        return items.reduce((total, item) => total += item.getPrice(), 0);
    }
}

// Usage
const cart = new ShoppingCart();
const items = [new Book(100), new Electronics(200)];
console.log(cart.calculateTotal(items)); // Output: 290