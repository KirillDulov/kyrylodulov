const weekFn = require('../js/weekFn');

describe('weekFn', () => {
    test('name of the day by a given number', () => {
        expect(weekFn(1)).toBe('Понеділок');
    });

    test('name of the day by a given number', () => {
        expect(weekFn(3)).toBe('Середа');
    });

    test('name of the day by a given number', () => {
        expect(weekFn(7)).toBe('Неділя');
    });

    test('name of the day by a given number', () => {
        expect(weekFn(9)).toBe(null);
    });

    test('name of the day by a given number', () => {
        expect(weekFn(1.5)).toBe(null);
    });

    test('name of the day by a given number', () => {
        expect(weekFn('2')).toBe(null);
    });

}
);
