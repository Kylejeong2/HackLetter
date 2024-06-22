"use client"

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { UserButton, auth } from '@clerk/nextjs';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import axios from "axios";
import { NextResponse } from 'next/server';
import { scrapeArticle } from '../backend/scrapeArticle';
// import main from '../backend/main';
// import { eq } from 'drizzle-orm';
// import { db } from '@/lib/db';

type Props = {}

const DashboardPage = async (props: Props) => {
    // const {userId} = auth()
    const handleSummarize = async () => {
        try {
                // Step 1: Scrape Hacker News
            const response = await axios.get('api/scrapeHackerNews');
            // console.log(hackerNewsData)

            // // Step 2: Extract URLs from the JSON data
            // // const urls = hackerNewsData.map((item: any) => item.url);
            // const urls = []
            // for(let i = 0; i < hackerNewsData.length; i++){
            //     urls.push(hackerNewsData[i].url)
            // }

            // Step 3: Scrape articles using the extracted URLs
            // const articles = []
            // for(let i = 0; i < urls.length; i++){
            //     let article = await axios.get('api/scrapeArticle', { url: urls[i] })
            //     articles.push(article.data.data)
            // }
            let articles = [await axios.get('api/scrapeArticle', response)]
            
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
            console.error('Failed to summarize articles', error);
            return new NextResponse("error", {status:500})
        }
    };

  return (
    <>
        <div className='grainy min-h-screen'>
            <div className='max-w-7xl mx-auto p-10'>
                <div className='h-14'>
                    <div className='flex justify-between items-center md:flex-row flex-col'>
                        <div className='flex items-center'>
                            <Link href="/">
                                <Button className='bg-orange-600' size="sm"><ArrowLeft className='mr-1 w-4 h-4'/>Back</Button>
                            </Link>

                            <div className='w-4'></div>
                            <h1 className='text-3xl font-bold text-gray-900'>Hack Letter Archives</h1>
                            <div className='w-4'></div>
                            <UserButton />
                        </div>
                    </div>

                    <div className="h-8"></div>

                    <Separator />
                    
                    <Button className="bg-orange-600" onClick={handleSummarize}>
                        Summarize HackerNews
                    </Button>
                    

                    <div className="mt-4"></div>
                </div>
            </div>
        </div>
    </>
    
  )
}

export default DashboardPage;