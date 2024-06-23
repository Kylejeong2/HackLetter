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
        // Fetch the HTML content of the web page
        const { data } = await axios.get(top5Stories[i].url);
        // Load the HTML into cheerio
        const $ = cheerio.load(data);
        const articleContent = $('article').text().trim();
        articles.push(articleContent)
    }

    // return new NextResponse("working", {status: 200})
    return NextResponse.json({articles})

  } catch (error) {

    console.error('Error fetching top stories:', error);
    return new NextResponse("error", {status:500})
  }
}