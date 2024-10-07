// SOLID Principles Refactor

// 1. NotificationService (Violation: Single Responsibility Principle)

// Bad Code
class NotificationService {
    sendEmail(email, message) {
        console.log(`Sending email to ${email}: ${message}`);
    }

    sendSMS(phoneNumber, message) {
        console.log(`Sending SMS to ${phoneNumber}: ${message}`);
    }

    logNotification(message) {
        console.log(`Logging notification: ${message}`);
    }

    notify(method, recipient, message) {
        if (method === "email") {
            this.sendEmail(recipient, message);
            this.logNotification(`Email sent to ${recipient}`);
        } else if (method === "sms") {
            this.sendSMS(recipient, message);
            this.logNotification(`SMS sent to ${recipient}`);
        } else {
            throw new Error("Unsupported notification method");
        }
    }
}

// Usage
const service = new NotificationService();
service.notify("email", "user@example.com", "Hello via Email!");

// Good Code
class EmailService {
    sendEmail(email, message) {
        console.log(`Sending email to ${email}: ${message}`);
    }
}

class SMSService {
    sendSMS(phoneNumber, message) {
        console.log(`Sending SMS to ${phoneNumber}: ${message}`);
    }
}

class LoggerService {
    log(message) {
        console.log(`Logging notification: ${message}`);
    }
}

class NotificationService {
    constructor(notificationMethod, logger) {
        this.notificationMethod = notificationMethod;
        this.logger = logger;
    }

    notify(recipient, message) {
        this.notificationMethod.send(recipient, message);
        this.logger.log(`Notification sent to ${recipient}`);
    }
}

// Usage with Strategy Pattern
const emailService = new EmailService();
const loggerService = new LoggerService();
const notificationService = new NotificationService(emailService, loggerService);

notificationService.notify("user@example.com", "Hello via Email!");


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


// 3. Shape (Adheres to SOLID)

// Bad Code
class Shape {
    area() {
        throw new Error("Method 'area()' must be implemented.");
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    area() {
        return this.width * this.height;
    }
}

class Square extends Rectangle {
    constructor(side) {
        super(side, side);
    }
}

// Usage
function printArea(shape) {
    console.log(`Area: ${shape.area()}`);
}

const shape = new Square(5);
printArea(shape);

// Good Code
// (No changes needed; adheres to SOLID principles)


/** 
 * 4. UserManager (Violation: Interface Segregation Principle) 
 */

// Bad Code
class UserManager {
    createUser(username) {
        console.log(`User ${username} created.`);
    }

    deleteUser(userId) {
        console.log(`User ${userId} deleted.`);
    }

    resetPassword(userId) {
        console.log(`Password for user ${userId} reset.`);
    }

    sendEmail(userId, message) {
        console.log(`Sending email to user ${userId}: ${message}`);
    }
}

// Usage
const userManager = new UserManager();
userManager.createUser("john_doe");
userManager.sendEmail(1, "Welcome!");

// Good Code
class UserService {
    createUser(username) {
        console.log(`User ${username} created.`);
    }

    deleteUser(userId) {
        console.log(`User ${userId} deleted.`);
    }

    resetPassword(userId) {
        console.log(`Password for user ${userId} reset.`);
    }
}

class NotificationService {
    sendEmail(userId, message) {
        console.log(`Sending email to user ${userId}: ${message}`);
    }
}

// Usage
const userService = new UserService();
userService.createUser("john_doe");

const notificationService = new NotificationService();
notificationService.sendEmail(1, "Welcome!");


// 5. PaymentProcessor (Violation: Dependency Inversion Principle)

// Bad Code
class PayPalPayment {
    pay(amount) {
        console.log(`Paid ${amount} using PayPal.`);
    }
}

class PaymentProcessor {
    constructor() {
        this.paymentMethod = new PayPalPayment(); 
    }

    processPayment(amount) {
        this.paymentMethod.pay(amount);
    }
}

// Usage
const processor = new PaymentProcessor();
processor.processPayment(100);

// Good Code
class PaymentMethod {
    pay(amount) {
        throw new Error("Method 'pay()' must be implemented.");
    }
}

class PayPalPayment extends PaymentMethod {
    pay(amount) {
        console.log(`Paid ${amount} using PayPal.`);
    }
}

class StripePayment extends PaymentMethod {
    pay(amount) {
        console.log(`Paid ${amount} using Stripe.`);
    }
}

class PaymentProcessor {
    constructor(paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    processPayment(amount) {
        this.paymentMethod.pay(amount);
    }
}

// Usage
const paypalPayment = new PayPalPayment();
const processor = new PaymentProcessor(paypalPayment);
processor.processPayment(100);



