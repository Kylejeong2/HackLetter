import axios from 'axios';
import * as cheerio from "cheerio";
import { NextResponse } from 'next/server';
// import fs from 'fs'; // for testing
// import path from 'path';

const HN_TOP_STORIES_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json';
const HN_ITEM_URL = 'https://hacker-news.firebaseio.com/v0/item';

export async function GET() {
  try {
    const { data: topStoryIds } = await axios.get<number[]>(HN_TOP_STORIES_URL);
    const top5StoryIds = topStoryIds.slice(0, 5);

    const storyPromises = top5StoryIds.map(id => axios.get(`${HN_ITEM_URL}/${id}.json`));
    const stories = await Promise.all(storyPromises);

    const top5Stories = stories.map(story => story.data); //gets array of json data 

    // Saving to a file for testing
    // const filePath = path.resolve(__dirname, 'top5Stories.txt');
    // const fileContent = JSON.stringify(top5Stories, null, 2);

    // fs.writeFileSync(filePath, fileContent);
    console.log('Top 5 stories saved.');
    // console.log(top5Stories)
    let articles = []
        
    for(let i = 0; i < top5Stories.length; i++){
        articles.push(top5Stories[i].url)
    }
    console.log(articles)

    let content = []
    // for(let i = 0; i < articles.length; i++){
    //   // Fetch the HTML content of the web page
    //   const { data } = await axios.get(articles[i]);
    //   // Load the HTML into cheerio
    //   const $ = cheerio.load(data);
    //   let articleContent = $('article').text().trim();
    //   articleContent = articleContent.replace(/[\n\t]/g, '')
    //   content.push(articleContent)
    // }

    // Fetch the HTML content of the web page
    const { data } = await axios.get(articles[0]);
    // Load the HTML into cheerio
    const $ = cheerio.load(data);
    let articleContent = $('article').text().trim();
    articleContent = articleContent.replace(/[\n\t]/g, '')
    content.push(articleContent)

    // console.log(content)

    // return new NextResponse("working", {status: 200})
    return NextResponse.json({content}) // json { articles: [] }

  } catch (error) {

    console.error('Error fetching top stories:', error);
    return new NextResponse("error", {status:500})
  }
}