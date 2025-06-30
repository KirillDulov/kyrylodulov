function curriedAdd(a) {
    return function (b) {
        return function (c) {
            return a + b + c;
        };
    };
}
const addFirst = curriedAdd(5);
const addSecond = addFirst(10);
const result = addSecond(3);
console.log('Result:', result)


function curriedDomain(protocol) {
    return function (domainName) {
        return function (tld) {
            return protocol + domainName + tld;
        };
    };
}

const protocolSetter = curriedDomain('https://')
const domainNameSetter = protocolSetter('example')
const fullDomain = domainNameSetter('.com')
console.log('Full Domain:', fullDomain)


function originalFunction(num) {
    return num * 4;
}

function modifyFunction(originalFunction, multiplier) {
    return function modifiedFunc(a) {
        return originalFunction(a) * multiplier;
    };
}
const modifiedFunc = modifyFunction(originalFunction, 3);
console.log('Original function output for 4:', originalFunction(4));
console.log('Modified function output for 4:', modifiedFunc(4))


function outerFunction(arg1) {
    function innerFunction(arg2) {
        function deepInnerFunction(arg3) {
            return arg1 * arg2 * arg3;
        }
        return deepInnerFunction;
    }
    return innerFunction;
}
const result1 = outerFunction(2)(3)(4)
console.log(result1)

