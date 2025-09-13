import { HfInference } from '@huggingface/inference';

export const hf = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY);
