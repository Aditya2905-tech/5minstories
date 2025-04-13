// generate-story.ts
'use server';
/**
 * @fileOverview A short story generation AI agent.
 *
 * - generateStory - A function that handles the story generation process.
 * - GenerateStoryInput - The input type for the generateStory function.
 * - GenerateStoryOutput - The return type for the generateStory function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateStoryInputSchema = z.object({
  prompt: z.string().describe('The prompt to generate a short story from.'),
});
export type GenerateStoryInput = z.infer<typeof GenerateStoryInputSchema>;

const GenerateStoryOutputSchema = z.object({
  story: z.string().describe('The generated short story.'),
});
export type GenerateStoryOutput = z.infer<typeof GenerateStoryOutputSchema>;

export async function generateStory(input: GenerateStoryInput): Promise<GenerateStoryOutput> {
  return generateStoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStoryPrompt',
  input: {
    schema: z.object({
      prompt: z.string().describe('The prompt to generate a short story from.'),
    }),
  },
  output: {
    schema: z.object({
      story: z.string().describe('The generated short story.'),
    }),
  },
  prompt: `You are a creative story writer. Please generate a 5-minute short story based on the following prompt:\n\nPrompt: {{{prompt}}}`,
});

const generateStoryFlow = ai.defineFlow<
  typeof GenerateStoryInputSchema,
  typeof GenerateStoryOutputSchema
>({
  name: 'generateStoryFlow',
  inputSchema: GenerateStoryInputSchema,
  outputSchema: GenerateStoryOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
