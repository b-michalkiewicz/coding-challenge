import { z } from 'zod';
import { DataDecodeError } from './errors';

const DogFacts = z.array(
    z.object({
        fact: z.string(),
    }),
);
export type DogFacts = z.infer<typeof DogFacts>;

export const decodeDogFacts = (input: unknown) => {
    const result = DogFacts.safeParse(input);
    return result.success ? result.data : new DataDecodeError(result.error.message);
};
