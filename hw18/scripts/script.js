homework 20

function defUpperStr(a) {
    return (a || 'default text').toUpperCase();
}
console.log(defUpperStr('My text'));


function ageClassification(n) {
    return n <= 0 ? null :
        n <= 24 ? 'Дитинство' :
            n <= 44 ? 'Молодість' :
                n <= 65 ? 'Зрілість' :
                    n <= 75 ? 'Старість' :
                        n <= 90 ? 'Довголіття' :
                            n <= 122 ? 'Рекорд' :
                                null;
}
console.log(ageClassification(15));


function cbRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);

}

function mainFunc(a, b, cb) {
    if (typeof cb !== 'function') {
        return false;
    }
    return cb(a, b);
};
console.log(mainFunc(2, 5, cbRandom));


function cbPow(num, pow) {
    return Math.pow(num, pow);
}

function mainFunc(a, b, cb) {
    if (typeof cb !== 'function') {
        return false;
    }
    return cb(a, b)
}
console.log(mainFunc(2, 3, cbPow));

function cbAdd(a, b) {
    return result = a + b;
}

function mainFunc(a, b, cb) {
    if (typeof cb !== 'function') {
        return false;
    }
    return cb(a, b)
}
console.log(mainFunc(10, 5, cbAdd))



