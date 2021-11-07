import { Result } from 'common/result';

export type DataObject = Record<string, unknown> | Record<string, unknown>[];

export type DataProvider<Data extends DataObject> = () => Promise<Result<Data>>;

export type DataMiddleware<Data extends DataObject> = (input: Data) => Data;

export type Success<Data extends DataObject = DataObject> = {
    kind: 'success';
    data: Data;
};

export type Error = {
    kind: 'error';
    message: string;
};

export type Event = Success | Error;

export type EventEmitter = (event: Event) => void;
