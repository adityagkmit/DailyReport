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

