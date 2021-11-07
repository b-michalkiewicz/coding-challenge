import { Error } from 'common/result';

export class DataDecodeError extends Error {}
export class DataFetchError extends Error {}

export const hasMessage = (error: unknown): error is { message: string } =>
    typeof error === 'object' && !!error && 'message' in error;
