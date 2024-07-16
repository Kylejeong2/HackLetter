// import { NextApiRequest, NextApiResponse } from 'next';
// import axios from 'axios';
// import * as cheerio from 'cheerio';
// import OpenAI from 'openai';
// import { MongoClient } from 'mongodb';
// import { Client as MailjetClient } from 'node-mailjet';
// import puppeteer from 'puppeteer';

// // OpenAI configuration
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// async function getStories() {
//   const topStoriesUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json';
//   const response = await axios.get(topStoriesUrl);
//   const topStoryIds = response.data;

//   async function getStoryDetails(storyId: number) {
//     const storyUrl = `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`;
//     const storyResponse = await axios.get(storyUrl);
//     return storyResponse.data;
//   }

//   const top5Stories = await Promise.all(topStoryIds.slice(0, 5).map(getStoryDetails));

//   async function scrapeContent(url: string): Promise<string | null> {
//     try {
//       const response = await axios.get(url);
//       const $ = cheerio.load(response.data);
//       return $('body').text().replace(/\n/g, '');
//     } catch (error) {
//       console.error(`Failed to fetch ${url}: ${error}`);
//       return null;
//     }
//   }

//   const top5StoriesContent: (string | null)[] = [];
//   const titles: string[] = [];
//   const urls: string[] = [];

//   for (const story of top5Stories) {
//     if ('url' in story) {
//       top5StoriesContent.push(await scrapeContent(story.url));
//       urls.push(story.url);
//     } else {
//       top5StoriesContent.push(story.text);
//       urls.push(`https://news.ycombinator.com/item?id=${story.id}`);
//     }
//     titles.push(story.title);
//   }

//   return [top5StoriesContent, titles, urls];
// }

// async function summarize(content: string): Promise<string> {
//   const completion = await openai.chat.completions.create({
//     model: "gpt-4",
//     messages: [
//       { role: "system", content: "You are an expert at summarizing, and identifying key points in text." },
//       { role: "user", content: `Summarize this text: ''' ${content} ''', making sure to capture only the key points and using only 3 sentences.` }
//     ],
//   });

//   return completion.choices[0].message?.content || '';
// }

// async function scrapeGraph(url: string): Promise<string> {
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();
  
//   try {
//     await page.goto(url, { waitUntil: 'networkidle0' });
//     const content = await page.content();
    
//     const $ = cheerio.load(content);
//     const text = $('body').text().replace(/\s+/g, ' ').trim();
    
//     const summary = await summarize(text);
    
//     return summary;
//   } catch (error) {
//     console.error(`Error scraping ${url}: ${error}`);
//     return `Failed to summarize content from ${url}`;
//   } finally {
//     await browser.close();
//   }
// }

// async function main() {
//   const info = await getStories();
//   const [storyContent, storyTitles, urls] = info;

//   const summaries = await Promise.all(urls.map(async (url, i) => {
//     if (url && (url.includes('x.com') || url.includes('twitter.com') || storyContent[i] === null ||
//         (typeof storyContent[i] === 'string' && storyContent[i].toLowerCase().includes('beehiiv')) || 
//         (typeof storyContent[i] === 'string' && storyContent[i].includes('400') && storyContent[i].toLowerCase().includes('bad') && storyContent[i].toLowerCase().includes('request')) || 
//         (typeof storyContent[i] === 'string' && storyContent[i].includes('403') && storyContent[i].toLowerCase().includes('forbidden')))) {
//       return scrapeGraph(url) || "";
//     } else {
//       return summarize(storyContent[i] as string);
//     }
//   }));

//   return [summaries, storyTitles, urls];
// }

// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }

//   try {
//     const mailjet = new MailjetClient({
//       apiKey: process.env.MAILJET_API_KEY || '',
//       apiSecret: process.env.MAILJET_SECRET_KEY || ''
//     });

//     const [summaries, titles, urls] = await main();

//     const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

//     // Connect to MongoDB
//     // const client = new MongoClient(process.env.MONGODB_CONNECTION || '');
//     // await client.connect();

//     // const db = client.db('Hackletter');
//     // const collection = db.collection('emails');

//     // // Fetch emails from MongoDB
//     // const emailDocs = await collection.find({}, { projection: { email: 1 } }).toArray();
//     // const emails = emailDocs.map(doc => doc.email);
//     const emails = ["kylejeong21@gmail.com"];

//     // Send emails
//     for (const email of emails) {
//       const data = {
//         Messages: [
//           {
//             From: {
//               Email: "Kyle@hackletter.co",
//               Name: "Your Daily Hackletter"
//             },
//             To: [
//               {
//                 Email: email,
//                 Name: ""
//               }
//             ],
//             Subject: `HackLetter ${currentDate}`,
//             TextPart: "HackLetter v1",
//             HTMLPart: `<head>
//                 <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
//                 <title>Newsletter</title>
//                 <style>body {font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;}.container {width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);}.header {text-align: center; padding: 20px 0;}.header img {max-width: 150px;}.headline {font-size: 24px; font-weight: bold; margin: 20px 0;}.article {margin-bottom: 20px;}.article img {max-width: 100%; height: auto;}.article h2 {font-size: 20px; margin: 10px 0;}.article p {font-size: 16px; line-height: 1.5;}.footer {text-align: center; padding: 20px 0; font-size: 14px; color: #888888;}.footer a {color: #888888; text-decoration: none;}</style>
//                 <script src="index.js"></script>
//             </head>
//             <body>
//               <div class="container">
//                 <div class="headline">Your Daily HackerNews Brief</div>
//                 ${summaries.map((summary, index) => `
//                   <div class="article">
//                     <h2><a href="${urls[index]}" target="_blank">${titles[index]}</a></h2>
//                     <p id="article${index + 1}">${summary}</p>
//                   </div>
//                 `).join('')}
//                 <div class="footer">
//                   <p>&copy; 2024 Hack Letter. All rights reserved.</p>
//                   <p><a href="www.hackletter.co/unsubscribe.html">Unsubscribe</a> | <a href="">Privacy Policy</a> | <a href="" target="_blank">Report Bugs to @Kylejeong21 on X</a></p>
//                 </div>
//               </div>
//             </body>`,
//             CustomID: "Hackletter V1"
//           }
//         ]
//       };

//       await mailjet.post('send', { version: 'v3.1' }).request(data);
//     }

//     // await client.close();

//     res.status(200).json({ message: 'Emails sent successfully', emailsSentTo: emails });
//   } catch (error) {
//     console.error('Error sending emails:', error);
//     res.status(500).json({ message: 'Error sending emails', error: (error as Error).message });
//   }
// }