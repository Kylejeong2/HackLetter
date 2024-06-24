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
        Give me a summary of this content: """ ##${prompt}## """.
        Keep the response about a paragraph long. Write with a neutral and informative tone, without mentioning the words "article" or "blog". 
        `,
      },
    ],
    stream: true,
  });
  const stream = OpenAIStream(response);
  console.log(stream)
  return new StreamingTextResponse(stream);
}