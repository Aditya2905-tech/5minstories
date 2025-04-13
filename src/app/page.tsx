'use client';

import {EnhanceGeneratedStoryOutput, enhanceGeneratedStory} from '@/ai/flows/enhance-story';
import {GenerateStoryOutput, generateStory} from '@/ai/flows/generate-story';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Separator} from '@/components/ui/separator';
import {Textarea} from '@/components/ui/textarea';
import {toast} from '@/hooks/use-toast';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';

export default function Home() {
  const [story, setStory] = useState<GenerateStoryOutput | null>(null);
  const [enhancedStory, setEnhancedStory] = useState<EnhanceGeneratedStoryOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const {register, handleSubmit, reset, watch, formState: {errors}} = useForm();

  const prompt = watch('prompt', ''); // Access the prompt value

  useEffect(() => {
    if (enhancedStory) {
      setStory({story: enhancedStory.enhancedStory});
    }
  }, [enhancedStory]);

  const onSubmit = async (data: any) => {
    setIsGenerating(true);
    try {
      const generated = await generateStory({prompt: data.prompt});
      setStory(generated);
      setEnhancedStory(null); // Clear any previous enhanced story
    } catch (error: any) {
      toast({
        title: 'Error generating story',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const onEnhance = async () => {
    if (!story) {
      toast({
        title: 'No story to enhance',
        description: 'Please generate a story first.',
        variant: 'destructive',
      });
      return;
    }
    setIsEnhancing(true);
    try {
      const enhanced = await enhanceGeneratedStory({story: story.story});
      setEnhancedStory(enhanced);
    } catch (error: any) {
      toast({
        title: 'Error enhancing story',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-10 bg-background">
      <Card className="w-full max-w-3xl bg-card shadow-md rounded-lg">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-2xl font-semibold text-foreground">StoryWeaver AI</CardTitle>
          <CardDescription className="text-muted-foreground">
            Generate a 5-minute short story based on your prompt.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
            <div>
              <Textarea
                id="prompt"
                placeholder="Enter your prompt here..."
                className="w-full rounded-md border-input bg-background text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                {...register('prompt', {required: 'Prompt is required'})}
              />
              {errors.prompt && <p className="text-red-500 text-sm mt-1">{errors.prompt.message}</p>}
            </div>
            <Button
              type="submit"
              className="bg-accent text-accent-foreground rounded-md hover:bg-accent-foreground hover:text-accent transition-colors duration-300"
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate Story'}
            </Button>
          </form>
          <Separator className="my-4" />
          {story && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-foreground mb-2">Generated Story</h2>
              <Card className="bg-secondary text-secondary-foreground shadow-sm rounded-md">
                <CardContent className="prose prose-sm m-4 max-w-none">
                  {story.story}
                </CardContent>
              </Card>
              <Button
                onClick={onEnhance}
                className="mt-4 bg-accent text-accent-foreground rounded-md hover:bg-accent-foreground hover:text-accent transition-colors duration-300"
                disabled={isEnhancing}
              >
                {isEnhancing ? 'Enhancing...' : 'Enhance Story'}
              </Button>
              {enhancedStory && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Enhanced Story</h3>
                  <Card className="bg-secondary text-secondary-foreground shadow-sm rounded-md">
                    <CardContent className="prose prose-sm m-4 max-w-none">
                      {enhancedStory.enhancedStory}
                      {enhancedStory.suggestions.length > 0 && (
                        <>
                          <h4 className="text-md font-semibold text-foreground mt-2">Suggestions</h4>
                          <ul className="list-disc list-inside">
                            {enhancedStory.suggestions.map((suggestion, index) => (
                              <li key={index}>{suggestion}</li>
                            ))}
                          </ul>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
