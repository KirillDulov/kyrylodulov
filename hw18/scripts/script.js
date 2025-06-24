function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1))
}
console.log(getRandomInt(10));
console.log(getRandomInt(50));
console.log(getRandomInt(100));

function greetByName(msg, name) {
    console.log(msg + ',' + ' ' + name)
    return
}
greetByName('Hi', 'John');
