import axios from 'axios';
import * as cheerio from 'cheerio'; //to scrape website
import { NextResponse } from 'next/server';

export async function GET(req: Request){
    try {
        const hackerNewsData = await req;

        let urls = []
        for(let i = 0; i < hackerNewsData.length; i++){
            urls.push(hackerNewsData[i].url)
        }

        let articles = []
        
        for(let i = 0; i < hackerNewsData.length; i++){
            // Fetch the HTML content of the web page
            const { data } = await axios.get(urls[i]);
            // Load the HTML into cheerio
            const $ = cheerio.load(data);
            const articleContent = $('article').text().trim();
            articles.push(articleContent)
        }
        console.log(articles)
        return NextResponse.json(hackerNewsData);

    } catch(error) {
        console.error(`Error fetching the article: ${error}`);
        return new NextResponse("Error", { status:500 });
    }
}

// // Example usage
// const url = 'https://example.com/article';
// scrapeArticle(url).then(content => {
//     console.log('Article Content:', content);
// }).catch(error => {
//     console.error('Error:', error);
// });