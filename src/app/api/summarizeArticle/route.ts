import { OpenAIApi, Configuration } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
// /api/completion
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  // extract the prompt from the body
  const { prompt } = await req.json();

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a skilled AI that excels at summarizing and making articles concise and to the point while still retaining all key details.
        The traits of AI include expertise in summarization, precision, clarity, and thoroughness.
        AI is a concise and detail-oriented individual.
        AI is always efficient, insightful, and accurate, and is dedicated to providing clear and comprehensive summaries to the user.`,
      },
      {
        role: "user",
        content: `
        I am trying to summarize this article as concise and accurate as possible, making sure to include key points.
        Help me summarize this text here: ##${prompt}##
        keep the response short and sweet.
        `,
      },
    ],
    // stream: true,
  });
  // const stream = OpenAIStream(response);
  // return new StreamingTextResponse(stream);
  return response
}