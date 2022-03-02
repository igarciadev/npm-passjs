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

    constructor(init?: Partial<KeyConfigJS>) {
        this.salt = init?.salt || '';
        this.iv = init?.iv || '';
        this.time = init?.time || 0;
        this.keyword = init?.keyword || '';
        this.upper = init?.upper || false;
        this.lower = init?.lower || false;
        this.number = init?.number || false;
        this.symbol = init?.symbol || false;
        this.length = init?.length || 0;
        this.minNumbers = init?.minNumbers || 0;
        this.minSymbols = init?.minSymbols || 0;
    }
}