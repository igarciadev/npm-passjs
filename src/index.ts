import * as CryptoJS from 'crypto-js';

import { KeyConfigJS } from './key-config';
import { RequiredError } from './required.error';

import text from './index.text.json';

class PasswordJS {

    private password: string;
    private symbols: string;
    private numbers: string;
    private letters: string;
    private excludedSymbols: string;
    private keyConfig: KeyConfigJS;
    private secret: string;

    constructor(keyConfig: KeyConfigJS, secret: string) {
        this.password = '';
        this.symbols = '!@#$%^&*';
        this.numbers = '0123456789';
        this.letters = 'abcdefghijklmnopqrstuvwxyz';
        this.excludedSymbols = '+=/';
        this.keyConfig = keyConfig;
        this.secret = secret;
    }

    generate(): string {

        this.keyConfig = new KeyConfigJS(this.keyConfig);

        if (!keyConfig.upper && !keyConfig.lower && !keyConfig.number && !keyConfig.symbol) {
            keyConfig.lower = true;
        if (!this.keyConfig.upper && !this.keyConfig.lower && !this.keyConfig.number && !this.keyConfig.symbol) {
            this.keyConfig.lower = true;
        }

        if (!keyConfig.upper && !keyConfig.lower && (!keyConfig.number || !keyConfig.symbol)) {
            keyConfig.minNumbers = keyConfig.length;
            keyConfig.minSymbols = keyConfig.length;
        if (!this.keyConfig.upper && !this.keyConfig.lower && (!this.keyConfig.number || !this.keyConfig.symbol)) {
            this.keyConfig.minNumbers = this.keyConfig.length;
            this.keyConfig.minSymbols = this.keyConfig.length;
        }

        if (!keyConfig.lower && !keyConfig.upper) {
            const result = keyConfig.length - keyConfig.minNumbers - keyConfig.minSymbols;
        if (!this.keyConfig.lower && !this.keyConfig.upper) {
            const result = this.keyConfig.length - this.keyConfig.minNumbers - this.keyConfig.minSymbols;
            if (result > 0) {
                this.keyConfig.minNumbers += result / 2;
                this.keyConfig.minSymbols += result / 2;
                if (result % 2 !== 0) {
                    this.keyConfig.minNumbers += 0.5;
                    this.keyConfig.minSymbols -= 0.5;
                }
            }
        }

        this.password = this.encode(this.keyConfig, this.secret);
        this.password = this.cut(this.keyConfig, this.password, this.secret);
        this.sanitize();

        if (keyConfig.lower && !keyConfig.upper) {
        if (this.keyConfig.lower && !this.keyConfig.upper) {
            this.password = this.password.toLowerCase();
        } else if (!this.keyConfig.lower && this.keyConfig.upper) {
            this.password = this.password.toUpperCase();
        }

        if (keyConfig.number) {
            this.addNumbers(keyConfig);
        if (this.keyConfig.number) {
            this.addNumbers(this.keyConfig);
        }

        if (keyConfig.symbol) {
            this.addSymbols(keyConfig);
        if (this.keyConfig.symbol) {
            this.addSymbols(this.keyConfig);
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

        for (let i = 0; i < keyConfig.minNumbers; i++) {

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

export const PassJS = (keyConfig: KeyConfigJS, secret: string): string => {

    if (!secret) {
        throw new Error(text.secretError);
    }

    if (!keyConfig.salt) {
        throw new RequiredError(text.saltError);
    }

    if (!keyConfig.iv) {
        throw new RequiredError(text.ivError);
    }

    if (keyConfig.time <= 0) {
        throw new RequiredError(text.timeError);
    }

    if (!keyConfig.keyword) {
        throw new RequiredError(text.keywordError);
    }

    if (keyConfig.length < 4) {
        throw new RequiredError(text.passLengthError);
    }

    if (keyConfig.minNumbers < 0) {
        throw new RequiredError(text.minNumbersError);
    }

    if (keyConfig.minSymbols < 0) {
        throw new RequiredError(text.minSymbolsError);
    }

    return new PasswordJS(keyConfig, secret).generate();
}