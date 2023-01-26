import { isBirthdayValid, isBlank, isPositiveNum } from './formatValidators';

describe('formatValidators', () => {
    describe('isBirthdayValid', () => {
        it('should return true for valid birthday in DD/MM/YYYY format', () => {
            expect(isBirthdayValid('01/01/2000')).toBe(true);
            expect(isBirthdayValid('29/02/2000')).toBe(true);
        });

        it('should return false for invalid dates in the proper format', () => {
            expect(isBirthdayValid('60/01/2000')).toBe(false);
            expect(isBirthdayValid('01/21/2000')).toBe(false);
            expect(isBirthdayValid('01/21/0000')).toBe(false);
        });

        it('should return false for invalid birthday format', () => {
            expect(isBirthdayValid('01-01-2000')).toBe(false);
            expect(isBirthdayValid('01/01/00')).toBe(false);
        });
    });

    describe('isPositiveNum', () => {
        it('should return true for valid positive numbers', () => {
            expect(isPositiveNum('123')).toBe(true);
            expect(isPositiveNum('123.45')).toBe(true);
        });

        it('should return false for invalid number format', () => {
            expect(isPositiveNum('123.123456')).toBe(false);
        });

        it('should return false for negative number', () => {
            expect(isPositiveNum('-123')).toBe(false);
        });
    });

    describe('isBlank', () => {
        it('should return true for an empty string', () => {
            expect(isBlank('')).toBe(true);
        });

        it('should return true for a string of spaces', () => {
            expect(isBlank('    ')).toBe(true);
        });

        it('should return false for a non-blank string', () => {
            expect(isBlank('Hello, world!')).toBe(false);
        });

        it('should return false for a non-blank string with spaces at the beginning and end', () => {
            expect(isBlank('   Hello, world!   ')).toBe(false);
        });
    });
});
