export class KeyConfigJS {
    salt: string;
    iv: string;
    time: number;
    keyword: string;
    upper: boolean;
    lower: boolean;
    number: boolean;
    symbol: boolean;
    length: number;
    minNumbers: number;
    minSymbols: number;

    constructor(keyConfig: KeyConfigJS) {
        this.salt = keyConfig.salt;
        this.iv = keyConfig.iv;
        this.time = keyConfig.time;
        this.keyword = keyConfig.keyword;
        this.upper = keyConfig.upper;
        this.lower = keyConfig.lower;
        this.number = keyConfig.number;
        this.symbol = keyConfig.symbol;
        this.length = keyConfig.length;
        this.minNumbers = keyConfig.minNumbers;
        this.minSymbols = keyConfig.minSymbols;
    }
}