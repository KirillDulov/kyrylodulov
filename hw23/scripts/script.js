class CalorieCalculator {
    constructor() {
        this.products = new Map();
    }

    addProduct(name, calories) {
        this.products.set(name, calories);
    }

    getProductCalories(name) {
        if (this.products.has(name)) {
            return this.products.get(name);
        }
        return 'Product not found';
    }

    removeProduct(name) {
        this.products.delete(name);
    }
}
const calorieCalculator = new CalorieCalculator();
calorieCalculator.addProduct('Apple', 52);
calorieCalculator.addProduct('Banana', 89);

console.log(calorieCalculator.getProductCalories('Apple'))
console.log(calorieCalculator.getProductCalories('Banana'))

calorieCalculator.removeProduct('Apple')
console.log(calorieCalculator.getProductCalories('Apple'))


class UniqueUsernames {
    constructor() {
        this.usernames = new Set();
    }

    addUser(username) {
        this.usernames.add(username);
    }

    exists(username) {
        return this.usernames.has(username);
    }

    count() {
        return this.usernames.size;
    }
}

const uniqueUsernames = new UniqueUsernames()
uniqueUsernames.addUser('john_doe');
uniqueUsernames.addUser('jane_doe');
uniqueUsernames.addUser('john_doe');

console.log(`Існує 'john_doe': ${uniqueUsernames.exists('john_doe')}`);
console.log(`Кількість унікальних імен: ${uniqueUsernames.count()}`)