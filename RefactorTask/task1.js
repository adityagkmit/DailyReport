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