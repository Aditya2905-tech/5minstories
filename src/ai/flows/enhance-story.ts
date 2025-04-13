// src/ai/flows/enhance-story.ts
'use server';

/**
 * @fileOverview Enhances a generated story by analyzing it for coherence and suggesting minor edits.
 *
 * - enhanceGeneratedStory - A function that enhances a generated story.
 * - EnhanceGeneratedStoryInput - The input type for the enhanceGeneratedStory function.
 * - EnhanceGeneratedStoryOutput - The return type for the enhanceGeneratedStory function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const EnhanceGeneratedStoryInputSchema = z.object({
  story: z.string().describe('The generated story to be enhanced.'),
});
export type EnhanceGeneratedStoryInput = z.infer<typeof EnhanceGeneratedStoryInputSchema>;

const EnhanceGeneratedStoryOutputSchema = z.object({
  enhancedStory: z.string().describe('The enhanced story with suggested edits.'),
  suggestions: z.array(z.string()).describe('A list of suggestions for improving the story.'),
});
export type EnhanceGeneratedStoryOutput = z.infer<typeof EnhanceGeneratedStoryOutputSchema>;

export async function enhanceGeneratedStory(input: EnhanceGeneratedStoryInput): Promise<EnhanceGeneratedStoryOutput> {
  return enhanceStoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceStoryPrompt',
  input: {
    schema: z.object({
      story: z.string().describe('The generated story to be enhanced.'),
    }),
  },
  output: {
    schema: z.object({
      enhancedStory: z.string().describe('The enhanced story with suggested edits.'),
      suggestions: z.array(z.string()).describe('A list of suggestions for improving the story.'),
    }),
  },
  prompt: `You are an AI story editor. You will be provided with a generated story, and your task is to analyze it for coherence, clarity, and overall quality.  You will suggest minor edits and improvements to the user, and return both the enhanced story and a list of specific suggestions.

Generated Story:
{{{story}}}`,
});

const enhanceStoryFlow = ai.defineFlow<
  typeof EnhanceGeneratedStoryInputSchema,
  typeof EnhanceGeneratedStoryOutputSchema
>({
  name: 'enhanceStoryFlow',
  inputSchema: EnhanceGeneratedStoryInputSchema,
  outputSchema: EnhanceGeneratedStoryOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  return output!;
});
