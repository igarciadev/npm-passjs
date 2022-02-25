export interface KeyConfigJS {
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
}