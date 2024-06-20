import { NextResponse } from 'next/server';
import { scrapeArticle } from './scrapeArticle';
import axios from "axios";

export default async function main() {
    try {
        // Step 1: Scrape Hacker News
        const response = await axios.get('api/scrapeHackerNews');
        const hackerNewsData = response.data; 

        // Step 2: Extract URLs from the JSON data
        const urls = hackerNewsData.map((item: any) => item.url);

        // Step 3: Scrape articles using the extracted URLs
        const articles = await Promise.all(urls.map((url: string) => scrapeArticle(url)));

        // Step 4: Summarize the articles
        let summaries = []
        for(let i = 0; i < articles.length; i++){
            let summary = await axios.post('api/summarizeArticle', { prompt: articles[i] });
            summaries.push(summary)
        }
        // Output the summaries
        // console.log(summaries);
        return(summaries)

    } catch (error) {
        console.error("Error:", error);
        return new NextResponse("error", {status:500})
    }
}