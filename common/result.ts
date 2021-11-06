export abstract class Error {
    constructor(public readonly message: string) {}
}

export type Result<T> = Error | T;
export const isError = (r: Result<any>): r is Error => r instanceof Error;
