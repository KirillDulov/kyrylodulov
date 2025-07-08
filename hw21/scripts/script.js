const counter = (function () {
    let count = 0;

    return function (n) {
        if (typeof n === 'number') {
            count = n;
        }
        return count++;
    };
})();

console.log(counter())
console.log(counter(100))
console.log(counter())



const counterFactory = (function () {
    let count = 0;
    return {
        value(n) {
            if (typeof n === 'number') {
                count = n;
            }
            return count;
        },
        increment() {
            return ++count;
        },
        decrement() {
            return --count;
        }
    };
})()
counterFactory.increment()
counterFactory.increment()
counterFactory.increment()
console.log(counterFactory.value());



const myPrint = (a, b, res) => {
    return a + '^' + b + '=' + res;
};

const myPow = (a, b, myPrint) => {
    const recPow = (x, y) => {
        if (y === 0) return 1;
        if (y > 0) return x * recPow(x, y - 1);
        return 1 / recPow(x, -y);
    };
    const result = recPow(a, b);
    return myPrint(a, b, result);
};
console.log(myPow(3, 4, myPrint));
console.log(myPow(2, -2, myPrint))



const myMax = (arr) => {
    return Math.max.apply(null, arr);
}
const list = [12, 23, 100, 34, 56, 9, 233]
console.log(myMax(list));


const myMul = (a, b) => {
    return a * b;
};

const myDouble = myMul.bind(null, 2);
console.log(myDouble(3))

const myTriple = myMul.bind(null, 3);
console.log(myTriple(5))