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