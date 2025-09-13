declare module '@xenova/transformers' {
    export function pipeline(task: string, model: string): Promise<{
        (inputs: string | string[], options?: { pooling?: string; normalize?: boolean }): Promise<number[] | number[][]>;
    }>;
} 