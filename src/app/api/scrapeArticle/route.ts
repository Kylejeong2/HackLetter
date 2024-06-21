import axios from 'axios';
import * as cheerio from 'cheerio'; //to scrape website
import { NextResponse } from 'next/server';

export async function GET(req: Request){
    try {
        const { url } = await req.json();
        // Fetch the HTML content of the web page
        const { data } = await axios.get(String(url));
        
        // Load the HTML into cheerio
        const $ = cheerio.load(data);
        
        // Select the main article content using a suitable selector
        // The selector may vary based on the website structure
        const articleContent = $('article').text().trim();
        console.log(articleContent)
        return NextResponse.json(articleContent);

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