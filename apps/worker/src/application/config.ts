import { decodeDogFacts } from './decoder';

export const dataProviderConfig = {
    url: 'https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?number=1',
    decoder: decodeDogFacts,
};

export type DataProviderConfig = typeof dataProviderConfig;
export const DataProviderConfig = Symbol.for('DataProviderConfig');
