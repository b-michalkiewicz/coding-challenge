import { Error } from 'common/result';
import { DataPipeline } from './data-pipeline';

const providerMock = jest.fn();
const middleware1Mock = jest.fn();
const middleware2Mock = jest.fn();
const eventEmitterMock = jest.fn();

let testSubject: DataPipeline<{ value: number }>;

class TestError extends Error {}

describe('DataPipeline - unit tests', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        testSubject = new DataPipeline(providerMock, [middleware1Mock, middleware2Mock], eventEmitterMock);
    });

    it('emits correct event and returns an error in failure flow', async () => {
        const error = new TestError('error');
        providerMock.mockResolvedValueOnce(error);

        expect(await testSubject.run()).toEqual(error);
        expect(eventEmitterMock).toHaveBeenCalledWith({ kind: 'error', message: 'error' });
        expect(middleware1Mock).toHaveBeenCalledTimes(0);
        expect(middleware2Mock).toHaveBeenCalledTimes(0);
    });

    it('emits correct event, calls middlewares and returns data in happy flow', async () => {
        const rawData = { value: 0 };
        const intermediateData = { value: 1 };
        const finalData = { value: 42 };

        providerMock.mockResolvedValueOnce(rawData);
        middleware1Mock.mockReturnValueOnce(intermediateData);
        middleware2Mock.mockReturnValueOnce(finalData);

        expect(await testSubject.run()).toEqual(finalData);
        expect(eventEmitterMock).toHaveBeenCalledWith({ kind: 'success', data: finalData });
        expect(middleware1Mock).toHaveBeenCalledWith(rawData);
        expect(middleware2Mock).toHaveBeenCalledWith(intermediateData);
    });
});
