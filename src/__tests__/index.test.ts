import { PassJS } from '../index';
import { KeyConfigJS } from '../key-config';
import { PassConfigJS } from '../pass-config';

const SALT = '2qozlrz2s258m175i0j402k112owqik1';
const IV = 'pi2150kj3763z7l0jt3o00l23uis7ljh';
const TIME = 1622745671223;

function countLetters(password: string): number {
    return password.replace(/[^A-Za-z]+/g, "").length;
}

function countNumbers(password: string): number {
    return password.replace(/[^0-9]+/g, '').length;
}

function countSymbols(password: string): number {
    return password.replace(/[^\W]+/g, '').length;
}

describe('Defining KeyConfig with empty secret word', () => {

    const keyConfig: KeyConfigJS = {
        salt: '',
        iv: IV,
        time: TIME,
        keyword: 'myKeyword',
        upper: true,
        lower: true,
        number: true,
        symbol: true,
        length: 8,
        minNumbers: 2,
        minSymbols: 2
    }

    test('should throw RequiredError with message \'Secret is required\'', () => {
        try {
            PassJS(keyConfig, '');
        } catch (e: any) {
            expect(e.message).toBe('Secret is required');
        }
    });
});

describe('Defining KeyConfig with empty salt', () => {

    const keyConfig: KeyConfigJS = {
        salt: '',
        iv: IV,
        time: TIME,
        keyword: 'myKeyword',
        upper: true,
        lower: true,
        number: true,
        symbol: true,
        length: 8,
        minNumbers: 2,
        minSymbols: 2
    }

    test('should throw RequiredError with message \'KeyConfig must have a salt value. Please, provide one salt value.\'', () => {
        try {
            PassJS(keyConfig, 'mySecretWord');
        } catch (e: any) {
            expect(e.message).toBe('KeyConfig must have a salt value. Please, provide one salt value.');
        }
    });
});

describe('Defining KeyConfig with empty iv', () => {

    const keyConfig: KeyConfigJS = {
        salt: SALT,
        iv: '',
        time: TIME,
        keyword: 'myKeyword',
        upper: true,
        lower: true,
        number: true,
        symbol: true,
        length: 8,
        minNumbers: 2,
        minSymbols: 2
    }

    test('should throw RequiredError with message \'KeyConfig must have a IV value. Please, provide one IV value.\'', () => {
        try {
            PassJS(keyConfig, 'mySecretWord');
        } catch (e: any) {
            expect(e.message).toBe('KeyConfig must have a IV value. Please, provide one IV value.');
        }
    });
});

describe('Defining KeyConfig with zero and -1 timestamp value', () => {

    const keyConfig: KeyConfigJS = {
        salt: SALT,
        iv: IV,
        time: 0,
        keyword: 'myKeyword',
        upper: true,
        lower: true,
        number: true,
        symbol: true,
        length: 8,
        minNumbers: 2,
        minSymbols: 2
    }

    test('should throw RequiredError with message \'KeyConfig must have a timestamp value greater than zero. Please, provide one timestamp value.\'', () => {
        try {
            PassJS(keyConfig, 'mySecretWord');
        } catch (e: any) {
            expect(e.message).toBe('KeyConfig must have a timestamp value greater than zero. Please, provide one timestamp value.');
        }
    });

    test('should throw RequiredError with message \'KeyConfig must have a timestamp value greater than zero. Please, provide one timestamp value.\'', () => {
        try {
            keyConfig.time = -1;
            PassJS(keyConfig, 'mySecretWord');
        } catch (e: any) {
            expect(e.message).toBe('KeyConfig must have a timestamp value greater than zero. Please, provide one timestamp value.');
        }
    });
});

describe('Defining KeyConfig with empty keyword', () => {

    const keyConfig: KeyConfigJS = {
        salt: SALT,
        iv: IV,
        time: TIME,
        keyword: '',
        upper: true,
        lower: true,
        number: true,
        symbol: true,
        length: 8,
        minNumbers: 2,
        minSymbols: 2
    }

    test('should throw RequiredError with message \'KeyConfig must have a keyword value. Please, provide a keyword.\'', () => {
        try {
            PassJS(keyConfig, 'mySecretWord');
        } catch (e: any) {
            expect(e.message).toBe('KeyConfig must have a keyword value. Please, provide a keyword.');
        }
    });
});

describe('Defining KeyConfig with zero and -1 length value', () => {

    const keyConfig: KeyConfigJS = {
        salt: SALT,
        iv: IV,
        time: TIME,
        keyword: 'myKeyword',
        upper: true,
        lower: true,
        number: true,
        symbol: true,
        length: 0,
        minNumbers: 2,
        minSymbols: 2
    }

    test('should throw RequiredError with message \'KeyConfig must have a password length value greater than or equals four. Please, provide a password length.\'', () => {
        try {
            PassJS(keyConfig, 'mySecretWord');
        } catch (e: any) {
            expect(e.message).toBe('KeyConfig must have a password length value greater than or equals four. Please, provide a password length.');
        }
    });

    test('should throw RequiredError with message \'KeyConfig must have a password length value greater than or equals four. Please, provide a password length.\'', () => {
        try {
            keyConfig.length = -1;
            PassJS(keyConfig, 'mySecretWord');
        } catch (e: any) {
            expect(e.message).toBe('KeyConfig must have a password length value greater than or equals four. Please, provide a password length.');
        }
    });
});

describe('Defining KeyConfig with zero and -1 minNumbers and minSymbols values', () => {

    const keyConfig: KeyConfigJS = {
        salt: SALT,
        iv: IV,
        time: TIME,
        keyword: 'myKeyword',
        upper: true,
        lower: true,
        number: true,
        symbol: true,
        length: 8,
        minNumbers: -1,
        minSymbols: 0
    }

    test('should throw RequiredError with message \'KeyConfig must have a minimum number of numbers value greater than or equals zero. Please, provide a minimum number of numbers.\'', () => {
        try {
            PassJS(keyConfig, 'mySecretWord');
        } catch (e: any) {
            expect(e.message).toBe('KeyConfig must have a minimum number of numbers value greater than or equals zero. Please, provide a minimum number of numbers.');
        }
    });

    test('should throw RequiredError with message \'KeyConfig must have a minimum number of symbols value greater than or equals zero. Please, provide a minimum number of symbols.\'', () => {
        try {
            keyConfig.minNumbers = 0;
            keyConfig.minSymbols = -1;
            PassJS(keyConfig, 'mySecretWord');
        } catch (e: any) {
            expect(e.message).toBe('KeyConfig must have a minimum number of symbols value greater than or equals zero. Please, provide a minimum number of symbols.');
        }
    });
});

describe('Defining KeyConfig object for test 1', () => {

    const keyConfig: KeyConfigJS = {
        salt: SALT,
        iv: IV,
        time: TIME,
        keyword: 'myKeyword',
        upper: true,
        lower: true,
        number: true,
        symbol: true,
        length: 8,
        minNumbers: 2,
        minSymbols: 2
    }

    const passConfig: PassConfigJS = {
        symbols: '!@#$%^&*',
        numbers: '0123456789',
        letters: 'abcdefghijklmnopqrstuvwxyz',
        excludedSymbols: '+=/'
    }

    const password = PassJS(keyConfig, 'mySecretWord', passConfig);

    test('Password generated is \'0yX%xO^6\'', () => {
        expect(password).toEqual('0yX%xO^6');
    });

    test('Password has 8 characters...', () => {
        expect(password.length).toEqual(8);
    });

    test('... which 4 are letters', () => {
        expect(countLetters(password)).toEqual(4);
    });

    test('... which 2 are numbers', () => {
        expect(countNumbers(password)).toEqual(2);
    });

    test('... which 2 are symbols', () => {
        expect(countSymbols(password)).toBeGreaterThanOrEqual(2);
    });
});

describe('Defining KeyConfig object for test 2', () => {

    const keyConfig: KeyConfigJS = {
        salt: SALT,
        iv: IV,
        time: TIME,
        keyword: 'myKeyword',
        upper: true,
        lower: true,
        number: true,
        symbol: false,
        length: 8,
        minNumbers: 2,
        minSymbols: 0
    }

    const passConfig: PassConfigJS = {
        symbols: '!@#$%^&*',
        numbers: '0123456789',
        letters: 'abcdefghijklmnopqrstuvwxyz',
        excludedSymbols: '+=/'
    }

    const password = PassJS(keyConfig, 'mySecretWord', passConfig);

    test('Password generated is \'UXu2R4rt\'', () => {
        expect(password).toEqual('UXu2R4rt');
    });

    test('Password has 8 characters...', () => {
        expect(password.length).toEqual(8);
    });

    test('... which 6 are letters', () => {
        expect(countLetters(password)).toEqual(6);
    });

    test('... which 2 are numbers', () => {
        expect(countNumbers(password)).toEqual(2);
    });

    test('... which 0 are symbols', () => {
        expect(countSymbols(password)).toBeGreaterThanOrEqual(0);
    });
});

describe('Defining KeyConfig object for test 3', () => {

    const keyConfig: KeyConfigJS = {
        salt: SALT,
        iv: IV,
        time: TIME,
        keyword: 'myKeyword',
        upper: true,
        lower: true,
        number: false,
        symbol: false,
        length: 8,
        minNumbers: 0,
        minSymbols: 0
    }

    const passConfig: PassConfigJS = {
        symbols: '!@#$%^&*',
        numbers: '0123456789',
        letters: 'abcdefghijklmnopqrstuvwxyz',
        excludedSymbols: '+=/'
    }

    const password = PassJS(keyConfig, 'mySecretWord', passConfig);

    test('Password generated is \'XPoYiAcK\'', () => {
        expect(password).toEqual('XPoYiAcK');
    });

    test('Password has 8 characters...', () => {
        expect(password.length).toEqual(8);
    });

    test('... which 8 are letters', () => {
        expect(countLetters(password)).toEqual(8);
    });

    test('... which 0 are numbers', () => {
        expect(countNumbers(password)).toEqual(0);
    });

    test('... which 0 are symbols', () => {
        expect(countSymbols(password)).toBeGreaterThanOrEqual(0);
    });
});

describe('Defining KeyConfig object for test 4', () => {

    const keyConfig: KeyConfigJS = {
        salt: SALT,
        iv: IV,
        time: TIME,
        keyword: 'myKeyword',
        upper: true,
        lower: true,
        number: true,
        symbol: true,
        length: 16,
        minNumbers: 6,
        minSymbols: 2
    }

    const passConfig: PassConfigJS = {
        symbols: '!@#$%^&*',
        numbers: '0123456789',
        letters: 'abcdefghijklmnopqrstuvwxyz',
        excludedSymbols: '+=/'
    }

    const password = PassJS(keyConfig, 'mySecretWord', passConfig);

    test('Password generated is \'V@xV5yr5$M8p202r\'', () => {
        expect(password).toEqual('V@xV5yr5$M8p202r');
    });

    test('Password has 16 characters...', () => {
        expect(password.length).toEqual(16);
    });

    test('... which 8 are letters', () => {
        expect(countLetters(password)).toEqual(8);
    });

    test('... which 6 are numbers', () => {
        expect(countNumbers(password)).toEqual(6);
    });

    test('... which 2 are symbols', () => {
        expect(countSymbols(password)).toBeGreaterThanOrEqual(2);
    });
});

describe('Defining KeyConfig object for test 5', () => {

    const keyConfig: KeyConfigJS = {
        salt: SALT,
        iv: IV,
        time: TIME,
        keyword: 'myKeyword',
        upper: true,
        lower: true,
        number: true,
        symbol: false,
        length: 16,
        minNumbers: 6,
        minSymbols: 0
    }

    const passConfig: PassConfigJS = {
        symbols: '!@#$%^&*',
        numbers: '0123456789',
        letters: 'abcdefghijklmnopqrstuvwxyz',
        excludedSymbols: '+=/'
    }

    const password = PassJS(keyConfig, 'mySecretWord', passConfig);

    test('Password generated is \'56O2srS6yQzO0y2w\'', () => {
        expect(password).toEqual('56O2srS6yQzO0y2w');
    });

    test('Password has 16 characters...', () => {
        expect(password.length).toEqual(16);
    });

    test('... which 10 are letters', () => {
        expect(countLetters(password)).toEqual(10);
    });

    test('... which 6 are numbers', () => {
        expect(countNumbers(password)).toEqual(6);
    });

    test('... which 0 are symbols', () => {
        expect(countSymbols(password)).toBeGreaterThanOrEqual(0);
    });
});

describe('Defining KeyConfig object for test 6', () => {

    const keyConfig: KeyConfigJS = {
        salt: SALT,
        iv: IV,
        time: TIME,
        keyword: 'myKeyword',
        upper: true,
        lower: true,
        number: false,
        symbol: false,
        length: 16,
        minNumbers: 0,
        minSymbols: 0
    }

    const passConfig: PassConfigJS = {
        symbols: '!@#$%^&*',
        numbers: '0123456789',
        letters: 'abcdefghijklmnopqrstuvwxyz',
        excludedSymbols: '+=/'
    }

    const password = PassJS(keyConfig, 'mySecretWord', passConfig);

    test('Password generated is \'zilHZXxvUXuCROrt\'', () => {
        expect(password).toEqual('zilHZXxvUXuCROrt');
    });

    test('Password has 16 characters...', () => {
        expect(password.length).toEqual(16);
    });

    test('... which 16 are letters', () => {
        expect(countLetters(password)).toEqual(16);
    });

    test('... which 0 are numbers', () => {
        expect(countNumbers(password)).toEqual(0);
    });

    test('... which 0 are symbols', () => {
        expect(countSymbols(password)).toBeGreaterThanOrEqual(0);
    });
});

describe('Defining KeyConfig object for test 7', () => {

    const keyConfig: KeyConfigJS = {
        salt: SALT,
        iv: IV,
        time: TIME,
        keyword: 'myKeyword',
        upper: false,
        lower: false,
        number: false,
        symbol: false,
        length: 16,
        minNumbers: 0,
        minSymbols: 0
    }

    const passConfig: PassConfigJS = {
        symbols: '!@#$%^&*',
        numbers: '0123456789',
        letters: 'abcdefghijklmnopqrstuvwxyz',
        excludedSymbols: '+=/'
    }

    const password = PassJS(keyConfig, 'mySecretWord', passConfig);

    test('Password generated is \'zilhzxxvuxucrort\'', () => {
        expect(password).toEqual('zilhzxxvuxucrort');
    });

    test('Password has 16 characters...', () => {
        expect(password.length).toEqual(16);
    });

    test('... which 16 are letters', () => {
        expect(countLetters(password)).toEqual(16);
    });

    test('... which 0 are numbers', () => {
        expect(countNumbers(password)).toEqual(0);
    });

    test('... which 0 are symbols', () => {
        expect(countSymbols(password)).toBeGreaterThanOrEqual(0);
    });
});

describe('Defining KeyConfig object for test 8', () => {

    const keyConfig: KeyConfigJS = {
        salt: SALT,
        iv: IV,
        time: TIME,
        keyword: 'myKeyword',
        upper: false,
        lower: false,
        number: true,
        symbol: true,
        length: 16,
        minNumbers: 0,
        minSymbols: 0
    }

    const passConfig: PassConfigJS = {
        symbols: '!@#$%^&*',
        numbers: '0123456789',
        letters: 'abcdefghijklmnopqrstuvwxyz',
        excludedSymbols: '+=/'
    }

    const password = PassJS(keyConfig, 'mySecretWord', passConfig);

    test('Password generated is \'04%^262&*&5^2$!2\'', () => {
        expect(password).toEqual('04%^262&*&5^2$!2');
    });

    test('Password has 16 characters...', () => {
        expect(password.length).toEqual(16);
    });

    test('... which 0 are letters', () => {
        expect(countLetters(password)).toEqual(0);
    });

    test('... which 8 are numbers', () => {
        expect(countNumbers(password)).toEqual(8);
    });

    test('... which 8 are symbols', () => {
        expect(countSymbols(password)).toBeGreaterThanOrEqual(8);
    });
});

describe('Defining KeyConfig object for test 9', () => {

    const keyConfig: KeyConfigJS = {
        salt: SALT,
        iv: IV,
        time: TIME,
        keyword: 'myKeyword',
        upper: false,
        lower: false,
        number: true,
        symbol: false,
        length: 16,
        minNumbers: 16,
        minSymbols: 0
    }

    const passConfig: PassConfigJS = {
        symbols: '!@#$%^&*',
        numbers: '0123456789',
        letters: 'abcdefghijklmnopqrstuvwxyz',
        excludedSymbols: '+=/'
    }

    const password = PassJS(keyConfig, 'mySecretWord', passConfig);

    test('Password generated is \'5186478493555752\'', () => {
        expect(password).toEqual('5186478493555752');
    });

    test('Password has 16 characters...', () => {
        expect(password.length).toEqual(16);
    });

    test('... which 0 are letters', () => {
        expect(countLetters(password)).toEqual(0);
    });

    test('... which 16 are numbers', () => {
        expect(countNumbers(password)).toEqual(16);
    });

    test('... which 0 are symbols', () => {
        expect(countSymbols(password)).toBeGreaterThanOrEqual(0);
    });
});

describe('Defining KeyConfig object for test 10', () => {

    const keyConfig: KeyConfigJS = {
        salt: SALT,
        iv: IV,
        time: TIME,
        keyword: 'myKeyword',
        upper: false,
        lower: false,
        number: false,
        symbol: true,
        length: 16,
        minNumbers: 0,
        minSymbols: 16
    }

    const passConfig: PassConfigJS = {
        symbols: '!@#$%^&*',
        numbers: '0123456789',
        letters: 'abcdefghijklmnopqrstuvwxyz',
        excludedSymbols: '+=/'
    }

    const password = PassJS(keyConfig, 'mySecretWord', passConfig);

    test('Password generated is \'&@^%^%&*^$*$%*&@\'', () => {
        expect(password).toEqual('&@^%^%&*^$*$%*&@');
    });

    test('Password has 16 characters...', () => {
        expect(password.length).toEqual(16);
    });

    test('... which 0 are letters', () => {
        expect(countLetters(password)).toEqual(0);
    });

    test('... which 0 are numbers', () => {
        expect(countNumbers(password)).toEqual(0);
    });

    test('... which 16 are symbols', () => {
        expect(countSymbols(password)).toBeGreaterThanOrEqual(16);
    });
});

describe('Defining KeyConfig object for test 11', () => {

    const keyConfig: KeyConfigJS = {
        salt: SALT,
        iv: IV,
        time: TIME,
        keyword: 'myKeyword',
        upper: false,
        lower: false,
        number: true,
        symbol: false,
        length: 11,
        minNumbers: 6,
        minSymbols: 5
    }

    const passConfig: PassConfigJS = {
        symbols: '!@#$%^&*',
        numbers: '0123456789',
        letters: 'abcdefghijklmnopqrstuvwxyz',
        excludedSymbols: '+=/'
    }

    const password = PassJS(keyConfig, 'mySecretWord', passConfig);

    test('Password generated is \'25536342288\'', () => {
        expect(password).toEqual('25536342288');
    });

    test('Password has 11 characters...', () => {
        expect(password.length).toEqual(11);
    });

    test('... which 0 are letters', () => {
        expect(countLetters(password)).toEqual(0);
    });

    test('... which 11 are numbers', () => {
        expect(countNumbers(password)).toEqual(11);
    });

    test('... which 0 are symbols', () => {
        expect(countSymbols(password)).toBeGreaterThanOrEqual(0);
    });
});

describe('Defining KeyConfig object for test 12', () => {

    const keyConfig: KeyConfigJS = {
        salt: SALT,
        iv: IV,
        time: TIME,
        keyword: 'myKeyword',
        upper: true,
        lower: true,
        number: true,
        symbol: true,
        length: 32,
        minNumbers: 12,
        minSymbols: 4
    }

    const passConfig: PassConfigJS = {
        symbols: '!@#$%^&*',
        numbers: '0123456789',
        letters: 'abcdefghijklmnopqrstuvwxyz',
        excludedSymbols: '+=/'
    }

    const password = PassJS(keyConfig, 'mySecretWord', passConfig);

    test('Password generated is \'T7qvT#v5%Qs5t234x6u!yu736wn^0v6v\'', () => {
        expect(password).toEqual('T7qvT#v5%Qs5t234x6u!yu736wn^0v6v');
    });

    test('Password has 32 characters...', () => {
        expect(password.length).toEqual(32);
    });

    test('... which 16 are letters', () => {
        expect(countLetters(password)).toEqual(16);
    });

    test('... which 12 are numbers', () => {
        expect(countNumbers(password)).toEqual(12);
    });

    test('... which 4 are symbols', () => {
        expect(countSymbols(password)).toBeGreaterThanOrEqual(4);
    });
});

describe('Defining KeyConfig object for test 13', () => {

    const keyConfig: KeyConfigJS = {
        salt: SALT,
        iv: IV,
        time: TIME,
        keyword: 'myKeyword',
        upper: true,
        lower: true,
        number: true,
        symbol: false,
        length: 32,
        minNumbers: 12,
        minSymbols: 0
    }

    const passConfig: PassConfigJS = {
        symbols: '!@#$%^&*',
        numbers: '0123456789',
        letters: 'abcdefghijklmnopqrstuvwxyz',
        excludedSymbols: '+=/'
    }

    const password = PassJS(keyConfig, 'mySecretWord', passConfig);

    test('Password generated is \'K2xwU16y21ww2116rmwslwtpx6tu47wI\'', () => {
        expect(password).toEqual('K2xwU16y21ww2116rmwslwtpx6tu47wI');
    });

    test('Password has 32 characters...', () => {
        expect(password.length).toEqual(32);
    });

    test('... which 20 are letters', () => {
        expect(countLetters(password)).toEqual(20);
    });

    test('... which 12 are numbers', () => {
        expect(countNumbers(password)).toEqual(12);
    });

    test('... which 0 are symbols', () => {
        expect(countSymbols(password)).toBeGreaterThanOrEqual(0);
    });
});

describe('Defining KeyConfig object for test 14', () => {

    const keyConfig: KeyConfigJS = {
        salt: SALT,
        iv: IV,
        time: TIME,
        keyword: 'myKeyword',
        upper: true,
        lower: true,
        number: false,
        symbol: false,
        length: 32,
        minNumbers: 0,
        minSymbols: 0
    }

    const passConfig: PassConfigJS = {
        symbols: '!@#$%^&*',
        numbers: '0123456789',
        letters: 'abcdefghijklmnopqrstuvwxyz',
        excludedSymbols: '+=/'
    }

    const password = PassJS(keyConfig, 'mySecretWord', passConfig);

    test('Password generated is \'smvXzAcFNZpvaufdrqbHuhcHayXixOog\'', () => {
        expect(password).toEqual('smvXzAcFNZpvaufdrqbHuhcHayXixOog');
    });

    test('Password has 32 characters...', () => {
        expect(password.length).toEqual(32);
    });

    test('... which 32 are letters', () => {
        expect(countLetters(password)).toEqual(32);
    });

    test('... which 0 are numbers', () => {
        expect(countNumbers(password)).toEqual(0);
    });

    test('... which 0 are symbols', () => {
        expect(countSymbols(password)).toBeGreaterThanOrEqual(0);
    });
});

describe('Defining KeyConfig object for test 15', () => {

    const keyConfig: KeyConfigJS = {
        salt: SALT,
        iv: IV,
        time: TIME,
        keyword: 'myKeyword',
        upper: true,
        lower: true,
        number: true,
        symbol: true,
        length: 64,
        minNumbers: 24,
        minSymbols: 8
    }

    const passConfig: PassConfigJS = {
        symbols: '!@#$%^&*',
        numbers: '0123456789',
        letters: 'abcdefghijklmnopqrstuvwxyz',
        excludedSymbols: '+=/'
    }

    const password = PassJS(keyConfig, 'mySecretWord', passConfig);

    test('Password generated is \'t6W32yrPr768U4!341o*o1u1rz502r$001@z5OS8v1oyrwX#0wWuXYZUY4^#r%r2\'', () => {
        expect(password).toEqual('t6W32yrPr768U4!341o*o1u1rz502r$001@z5OS8v1oyrwX#0wWuXYZUY4^#r%r2');
    });

    test('Password has 64 characters...', () => {
        expect(password.length).toEqual(64);
    });

    test('... which 32 are letters', () => {
        expect(countLetters(password)).toEqual(32);
    });

    test('... which 24 are numbers', () => {
        expect(countNumbers(password)).toEqual(24);
    });

    test('... which 8 are symbols', () => {
        expect(countSymbols(password)).toBeGreaterThanOrEqual(8);
    });
});

describe('Defining KeyConfig object for test 16', () => {

    const keyConfig: KeyConfigJS = {
        salt: SALT,
        iv: IV,
        time: TIME,
        keyword: 'myKeyword',
        upper: true,
        lower: true,
        number: true,
        symbol: false,
        length: 64,
        minNumbers: 24,
        minSymbols: 0
    }

    const passConfig: PassConfigJS = {
        symbols: '!@#$%^&*',
        numbers: '0123456789',
        letters: 'abcdefghijklmnopqrstuvwxyz',
        excludedSymbols: '+=/'
    }

    const password = PassJS(keyConfig, 'mySecretWord', passConfig);

    test('Password generated is \'w204V64kyu23twwM6vov31MJTu8vzO3pT7qPT7vz7lsLty37xvu5yN7260nO0t6N\'', () => {
        expect(password).toEqual('w204V64kyu23twwM6vov31MJTu8vzO3pT7qPT7vz7lsLty37xvu5yN7260nO0t6N');
    });

    test('Password has 64 characters...', () => {
        expect(password.length).toEqual(64);
    });

    test('... which 40 are letters', () => {
        expect(countLetters(password)).toEqual(40);
    });

    test('... which 24 are numbers', () => {
        expect(countNumbers(password)).toEqual(24);
    });

    test('... which 0 are symbols', () => {
        expect(countSymbols(password)).toBeGreaterThanOrEqual(0);
    });
});

describe('Defining KeyConfig object for test 17', () => {

    const keyConfig: KeyConfigJS = {
        salt: SALT,
        iv: IV,
        time: TIME,
        keyword: 'myKeyword',
        upper: true,
        lower: true,
        number: false,
        symbol: false,
        length: 64,
        minNumbers: 0,
        minSymbols: 0
    }

    const passConfig: PassConfigJS = {
        symbols: '!@#$%^&*',
        numbers: '0123456789',
        letters: 'abcdefghijklmnopqrstuvwxyz',
        excludedSymbols: '+=/'
    }

    const password = PassJS(keyConfig, 'mySecretWord', passConfig);

    test('Password generated is \'BVyZfDaPMDxIEbIyJUAxCbivxEhlEPoqUDAecdsEQXfrOfmQEtquStjmGSzPNrgO\'', () => {
        expect(password).toEqual('BVyZfDaPMDxIEbIyJUAxCbivxEhlEPoqUDAecdsEQXfrOfmQEtquStjmGSzPNrgO');
    });

    test('Password has 64 characters...', () => {
        expect(password.length).toEqual(64);
    });

    test('... which 64 are letters', () => {
        expect(countLetters(password)).toEqual(64);
    });

    test('... which 0 are numbers', () => {
        expect(countNumbers(password)).toEqual(0);
    });

    test('... which 0 are symbols', () => {
        expect(countSymbols(password)).toBeGreaterThanOrEqual(0);
    });
});

describe('Defining KeyConfig object for test 18', () => {

    const keyConfig: KeyConfigJS = {
        salt: SALT,
        iv: IV,
        time: TIME,
        keyword: 'myKeyword',
        upper: true,
        lower: true,
        number: true,
        symbol: true,
        length: 128,
        minNumbers: 48,
        minSymbols: 16
    }

    const passConfig: PassConfigJS = {
        symbols: '!@#$%^&*',
        numbers: '0123456789',
        letters: 'abcdefghijklmnopqrstuvwxyz',
        excludedSymbols: '+=/'
    }

    const password = PassJS(keyConfig, 'mySecretWord', passConfig);

    test('Password generated is \'v13Sur34wz1^Q287y0x6vx0$2%2&51v1QR^uZwY2S1UZX*R3V8&q1zx81xYw30*y8wq31021ww^9TwT1V2zXx19z5v&1zWs014z*$zv$5%s5Zs1@TYyt7S9sVx0q#Q6T\'', () => {
        expect(password).toEqual('v13Sur34wz1^Q287y0x6vx0$2%2&51v1QR^uZwY2S1UZX*R3V8&q1zx81xYw30*y8wq31021ww^9TwT1V2zXx19z5v&1zWs014z*$zv$5%s5Zs1@TYyt7S9sVx0q#Q6T');
    });

    test('Password has 128 characters...', () => {
        expect(password.length).toEqual(128);
    });

    test('... which 64 are letters', () => {
        expect(countLetters(password)).toEqual(64);
    });

    test('... which 48 are numbers', () => {
        expect(countNumbers(password)).toEqual(48);
    });

    test('... which 16 are symbols', () => {
        expect(countSymbols(password)).toBeGreaterThanOrEqual(16);
    });
});

describe('Defining KeyConfig object for test 19', () => {

    const keyConfig: KeyConfigJS = {
        salt: SALT,
        iv: IV,
        time: TIME,
        keyword: 'myKeyword',
        upper: true,
        lower: true,
        number: true,
        symbol: false,
        length: 128,
        minNumbers: 48,
        minSymbols: 0
    }

    const passConfig: PassConfigJS = {
        symbols: '!@#$%^&*',
        numbers: '0123456789',
        letters: 'abcdefghijklmnopqrstuvwxyz',
        excludedSymbols: '+=/'
    }

    const password = PassJS(keyConfig, 'mySecretWord', passConfig);

    test('Password generated is \'Mw417Tu21O0u20slpxyVtsW02trOrw6qUlkp4qo1o1uRr5512UKo0ukm5xS2v7o0r6X30yWPX7Z8Y4j3r1rMx1T1qz602r6031wz7O5I012yzwqNTw3uxYjUM4IkyKk2\'', () => {
        expect(password).toEqual('Mw417Tu21O0u20slpxyVtsW02trOrw6qUlkp4qo1o1uRr5512UKo0ukm5xS2v7o0r6X30yWPX7Z8Y4j3r1rMx1T1qz602r6031wz7O5I012yzwqNTw3uxYjUM4IkyKk2');
    });

    test('Password has 128 characters...', () => {
        expect(password.length).toEqual(128);
    });

    test('... which 80 are letters', () => {
        expect(countLetters(password)).toEqual(80);
    });

    test('... which 48 are numbers', () => {
        expect(countNumbers(password)).toEqual(48);
    });

    test('... which 0 are symbols', () => {
        expect(countSymbols(password)).toBeGreaterThanOrEqual(0);
    });
});

describe('Defining KeyConfig object for test 20', () => {

    const keyConfig: KeyConfigJS = {
        salt: SALT,
        iv: IV,
        time: TIME,
        keyword: 'myKeyword',
        upper: true,
        lower: true,
        number: false,
        symbol: false,
        length: 128,
        minNumbers: 0,
        minSymbols: 0
    }

    const passConfig: PassConfigJS = {
        symbols: '!@#$%^&*',
        numbers: '0123456789',
        letters: 'abcdefghijklmnopqrstuvwxyz',
        excludedSymbols: '+=/'
    }

    const password = PassJS(keyConfig, 'mySecretWord', passConfig);

    test('Password generated is \'EEplcPvqcDvemdvEhXYrpfBQmtZuctHmyScPdrAOubzzKwmCgvSocuAyKxcKLZszdoqrvwyQTuKzsxYKlxvpFbOkbWzffyqBkFmPdmSaAuxcBmyxfgalMxxJEtIeJyAB\'', () => {
        expect(password).toEqual('EEplcPvqcDvemdvEhXYrpfBQmtZuctHmyScPdrAOubzzKwmCgvSocuAyKxcKLZszdoqrvwyQTuKzsxYKlxvpFbOkbWzffyqBkFmPdmSaAuxcBmyxfgalMxxJEtIeJyAB');
    });

    test('Password has 128 characters...', () => {
        expect(password.length).toEqual(128);
    });

    test('... which 128 are letters', () => {
        expect(countLetters(password)).toEqual(128);
    });

    test('... which 0 are numbers', () => {
        expect(countNumbers(password)).toEqual(0);
    });

    test('... which 0 are symbols', () => {
        expect(countSymbols(password)).toBeGreaterThanOrEqual(0);
    });
});