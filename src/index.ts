import * as CryptoJS from 'crypto-js';

import { KeyConfigJS } from './key-config';
import { PassConfigJS } from './pass-config';
import { RequiredError } from './required.error';

class PasswordJS {

    private password: string;
    private symbols: string;
    private numbers: string;
    private letters: string;
    private excludedSymbols: string;

    constructor(passConfig: PassConfigJS) {
        this.password = '';
        this.symbols = passConfig.symbols;
        this.numbers = passConfig.numbers;
        this.letters = passConfig.letters;
        this.excludedSymbols = passConfig.excludedSymbols;
    }

    generate(keyConfig: KeyConfigJS, secret: string): string {

        if (!keyConfig.upper && !keyConfig.lower && !keyConfig.number && !keyConfig.symbol) {
            keyConfig.lower = true;
        }

        if (!keyConfig.upper && !keyConfig.lower && (!keyConfig.number || !keyConfig.symbol)) {
            keyConfig.minNumbers = keyConfig.length;
            keyConfig.minSymbols = keyConfig.length;
        }

        if (!keyConfig.lower && !keyConfig.upper) {
            const result = keyConfig.length - keyConfig.minNumbers - keyConfig.minSymbols;
            if (result > 0) {
                keyConfig.minNumbers += result / 2;
                keyConfig.minSymbols += result / 2;
                if (result % 2 !== 0) {
                    keyConfig.minNumbers += 0.5;
                    keyConfig.minSymbols -= 0.5;
                }
            }
        }

        this.password = this.encode(keyConfig, secret);
        this.password = this.cut(keyConfig, this.password, secret);
        this.sanitize();

        if (keyConfig.lower && !keyConfig.upper) {
            this.password = this.password.toLowerCase();
        } else if (!keyConfig.lower && keyConfig.upper) {
            this.password = this.password.toUpperCase();
        }

        if (keyConfig.number) {
            this.addNumbers(keyConfig);
        }

        if (keyConfig.symbol) {
            this.addSymbols(keyConfig);
        }

        return this.password;
    }

    private cut(keyConfig: KeyConfigJS, password: string, secret: string): string {

        if (password.length >= keyConfig.length) {
            const newPassword = this.reorder(this.reorder(password, 2), 1);
            return newPassword.substring(newPassword.length - keyConfig.length);
        } else {
            return this.cut(keyConfig, this.encode(keyConfig, secret, keyConfig.keyword) + password, secret);
        }
    }

    private reorder(password: string, module: number): string {

        let newPassword = '';
        for (let i = 0; i < password.length; i++) {

            if (i % module === 0) {
                newPassword += password[i];
            } else {
                newPassword += password[password.length - i];
            }
        }

        return newPassword;
    }

    private sanitize(): void {

        for (let i = 0; i <= this.numbers.length; i++) {

            if (i < this.excludedSymbols.length) {
                const symbol = this.excludedSymbols[i];
                this.password = this.password.replace(new RegExp('\\' + symbol, 'g'), this.letters[i]);
            }

            this.password = this.password.replace(new RegExp(String(i), 'g'), this.letters[this.letters.length - 1 - i]);
        }
    }

    private addNumbers(keyConfig: KeyConfigJS): void {

        for (let i = 0; i < keyConfig?.minNumbers || 0; i++) {

            let count = 0;
            let position = -1;
            while (position < 0) {
                position = this.password.indexOf(this.letters[count]);
                if (position < 0) {
                    position = this.password.indexOf(this.letters[count].toUpperCase());
                }

                count++;
            }

            count = (count - 1) % 10;

            this.password = this.password.replace(this.password[position], String(count));
        }

        let checkPass = this.password;
        for (let i = 0; i < this.numbers.length; i++) {
            checkPass = checkPass.replace(new RegExp(String(i), 'g'), '');
        }

        let upperCheck = false;
        let lowerCheck = false;
        checkPass.split('').forEach(m => {
            if (this.letters.toUpperCase().indexOf(m) >= 0 && !upperCheck) {
                upperCheck = true;
            }
            if (this.letters.indexOf(m) >= 0 && !lowerCheck) {
                lowerCheck = true;
            }
        });

        if (!upperCheck && keyConfig.upper) {
            this.password = this.password.replace(checkPass[0], checkPass[0].toUpperCase());
        }

        if (!lowerCheck && keyConfig.lower) {
            this.password = this.password.replace(checkPass[0], checkPass[0].toLowerCase());
        }
    }

    private addSymbols(keyConfig: KeyConfigJS): void {

        let symbolsCopy: string[] = [];

        for (let i = 0; i < keyConfig.minSymbols; i++) {

            let count = 0;
            let position = -1;
            while (position < 0) {
                position = this.password.indexOf(this.letters[count]);
                if (position < 0) {
                    position = this.password.indexOf(this.letters[count].toUpperCase());
                }
                count++;
            }

            count = (count - 1) % 10;

            if (count > symbolsCopy.length - 1) {
                count = Math.round(count / 2);
            }

            if (symbolsCopy.length - 1 < count) {
                symbolsCopy = this.symbols.split('');
            }

            const letter = this.password[position];
            const symbol = symbolsCopy[count];

            symbolsCopy.splice(count, 1);

            this.password = this.password.replace(letter, symbol);
        }
    }

    private encode(config: KeyConfigJS, secret: string, keyword?: string): string {

        if (keyword === undefined) {
            keyword = config.keyword;
        }

        config.time += config.time;
        const minNumbers = config.minNumbers === 0 ? 1 : config.minNumbers;
        const minSymbols = config.minSymbols === 0 ? 1 : config.minSymbols;

        keyword = keyword + (config.time * config.length * minNumbers * minSymbols);

        const salt = CryptoJS.enc.Hex.parse(config.salt);
        const iv = CryptoJS.enc.Hex.parse(config.iv);
        const key = CryptoJS.PBKDF2(secret, salt, { keySize: 128 / 32, iterations: 100 });
        const opt = { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 };

        return CryptoJS.AES.encrypt(keyword, key, opt).toString();
    }
}

export const PassJS = (keyConfig: KeyConfigJS, secret: string, passConfig?: PassConfigJS) => {

    const SYMBOLS = '!@#$%^&*';
    const NUMBERS = '0123456789';
    const LETTERS = 'abcdefghijklmnopqrstuvwxyz';
    const EXCLUDED_SYMBOLS = '+=/';

    const keyConfigError = 'keyConfig is required';
    const secretError = 'Secret is required';
    const saltError = 'Salt value is required. KeyConfig must have a salt value. Please, provide one salt value.';
    const ivError = 'IV value is required. KeyConfig must have a IV value. Please, provide one IV value.';
    const timeError = 'Timestamp value is required. KeyConfig must have a timestamp value greater than zero. Please, provide one timestamp value.';
    const keywordError = 'Keyword value is required. KeyConfig must have a keyword value. Please, provide a keyword.';
    const passLengthError = 'Password length is required. KeyConfig must have a password length value greater than or equals four. Please, provide a password length.';
    const minNumbersError = 'Minumum number of numbers is required. KeyConfig must have a minimum number of numbers value greater than or equals zero. Please, provide a minimum number of numbers.';
    const minSymbolsError = 'Minumum number of symbols is required. KeyConfig must have a minimum number of symbols value greater than or equals zero. Please, provide a minimum number of symbols.';

    if (!keyConfig) {
        throw new Error(keyConfigError);
    }

    if (!secret) {
        throw new Error(secretError);
    }

    if (!keyConfig.salt) {
        throw new RequiredError(saltError);
    }

    if (!keyConfig.iv) {
        throw new RequiredError(ivError);
    }

    if (keyConfig.time <= 0) {
        throw new RequiredError(timeError);
    }

    if (!keyConfig.keyword) {
        if (!passConfig) {
            throw new RequiredError(keywordError);
        } else {
            keyConfig.keyword = passConfig.letters;
        }
    }

    if (keyConfig.length < 4) {
        throw new RequiredError(passLengthError);
    }

    if (keyConfig.minNumbers < 0) {
        throw new RequiredError(minNumbersError);
    }

    if (keyConfig.minSymbols < 0) {
        throw new RequiredError(minSymbolsError);
    }

    if (!passConfig) {
        passConfig = {
            symbols: SYMBOLS,
            numbers: NUMBERS,
            letters: LETTERS,
            excludedSymbols: EXCLUDED_SYMBOLS
        }
    } else {
        if (!passConfig.symbols) {
            passConfig.symbols = SYMBOLS;
        }
        if (!passConfig.numbers) {
            passConfig.numbers = NUMBERS;
        }
        if (!passConfig.letters) {
            passConfig.letters = LETTERS;
        }
        if (!passConfig.excludedSymbols) {
            passConfig.excludedSymbols = EXCLUDED_SYMBOLS;
        }
    }

    const passwordJS = new PasswordJS(passConfig);
    return passwordJS.generate(keyConfig, secret);
}
