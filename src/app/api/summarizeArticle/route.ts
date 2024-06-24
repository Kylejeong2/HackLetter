import { OpenAIApi, Configuration } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
// /api/summarizeArticle

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  // extract the prompt from the body
  const { prompt } = await req.json();

  const response = await openai.createChatCompletion({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are a skilled AI that excels at summarizing and making articles concise and to the point while still retaining all key details.
        The traits of AI include expertise in summarization, precision, clarity, and thoroughness. You don't include extra words or sentences, just important information that pertains to what you're given.
        `
      },
      {
        role: "user",
        content: `
        I am trying to summarize this article as concise and accurate as possible, making sure to include key points.
        Summarize the article at this url: ##${prompt}##
        Keep the response about a paragraph long. Make it sound like a human wrote it, without mentioning the word article. 
        `,
      },
    ],
    stream: true,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}