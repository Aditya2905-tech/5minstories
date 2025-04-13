{# StoryWeaver AI

## Description

StoryWeaver AI is a Next.js application that generates short stories based on user-provided prompts using Gemini AI. It also provides an AI tool to enhance the generated story for coherence and clarity.

## Features

-   Story Generation: Generates a 5-minute short story based on a user-provided prompt using Gemini AI.
-   Story Display: Displays the generated story in a clean, readable format.
-   Story Enhancement: AI tool that analyzes the generated story for coherence and suggests minor edits or improvements to the user.
-   Prompt Input: Allows users to input custom prompts for story generation.

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone [repository_url]
    cd [repository_name]
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add your Google Gemini API key:

    ```
    GOOGLE_GENAI_API_KEY=YOUR_API_KEY
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

    Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Genkit Development

To run Genkit in development mode:

```bash
npm run genkit:dev
# or
yarn genkit:dev
# or
pnpm genkit:dev
```

## License

[Choose a License]

    