export interface Contents {
    low: Content[];
    high: Content[];
}

/**
 * Пара эмодзи и имени для пчелы или дефендера
 */
export interface Content {
    pic: string;
    name: string;
}