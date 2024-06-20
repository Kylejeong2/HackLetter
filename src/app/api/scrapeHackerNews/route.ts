import axios from 'axios';
import { NextResponse } from 'next/server';

// import fs from 'fs'; // for testing
// import path from 'path';

const HN_TOP_STORIES_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json';
const HN_ITEM_URL = 'https://hacker-news.firebaseio.com/v0/item';

export default async function GET() {
  try {
    const { data: topStoryIds } = await axios.get<number[]>(HN_TOP_STORIES_URL);
    const top10StoryIds = topStoryIds.slice(0, 10);

    const storyPromises = top10StoryIds.map(id => axios.get(`${HN_ITEM_URL}/${id}.json`));
    const stories = await Promise.all(storyPromises);

    const top10Stories = stories.map(story => story.data); //gets json data

    // Saving to a file for testing
    // const filePath = path.resolve(__dirname, 'top10Stories.txt');
    // const fileContent = JSON.stringify(top10Stories, null, 2);

    // fs.writeFileSync(filePath, fileContent);

    console.log('Top 10 stories saved.');
    return top10Stories;
    
  } catch (error) {

    console.error('Error fetching top stories:', error);
    return new NextResponse("error", {status:500})
  }
}