const ageClassification = require('../js/ageClassification');
console.log(ageClassification);

describe('ageClassification', () => {
    test('ageClassification', () => {
        expect(ageClassification(-1)).toBe(null);
    });

    test('ageClassification', () => {
        expect(ageClassification(0)).toBe(null);
    });
    test('ageClassification', () => {
        expect(ageClassification(1)).toBe('Дитинство');
    });
    test('ageClassification', () => {
        expect(ageClassification(24)).toBe('Дитинство');
    });
    test('ageClassification', () => {
        expect(ageClassification(24.01)).toBe('Молодість');
    });
    test('ageClassification', () => {
        expect(ageClassification(44.01)).toBe('Зрілість');
    });
    test('ageClassification', () => {
        expect(ageClassification(65)).toBe('Зрілість');
    });
    test('ageClassification', () => {
        expect(ageClassification(65.1)).toBe('Старість');
    });
    test('ageClassification', () => {
        expect(ageClassification(75)).toBe('Старість');
    });
    test('ageClassification', () => {
        expect(ageClassification(75.01)).toBe('Довголіття');
    });
    test('ageClassification', () => {
        expect(ageClassification(90)).toBe('Довголіття');
    });
    test('ageClassification', () => {
        expect(ageClassification(90.01)).toBe('Рекорд');
    });
    test('ageClassification', () => {
        expect(ageClassification(122)).toBe('Рекорд');
    });
    test('ageClassification', () => {
        expect(ageClassification(122.01)).toBe(null);
    });
    test('ageClassification', () => {
        expect(ageClassification(150)).toBe(null);
    });
}
);

