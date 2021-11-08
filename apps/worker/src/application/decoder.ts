import { z } from 'zod';
import { DataDecodeError } from './errors';

const dogFacts = z.array(
    z.object({
        fact: z.string(),
    }),
);

export const decodeDogFacts = (input: unknown) => {
    const result = dogFacts.safeParse(input);
    return result.success ? result.data : new DataDecodeError(result.error.message);
};
