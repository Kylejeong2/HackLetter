"use client"

import { Button } from '@/components/ui/button';
import React, { use, useState } from 'react';
import { useCompletion } from 'ai/react';
import { main } from '@/app/backend/main';
type Props = {}

const HackerNewsText = (props: Props) => {
    let completions : String[] = [];
    const [list, setList] = useState(completions)
    const { complete, completion } = useCompletion({
        api: "/api/summarizeArticle",
      });

    const handleSummarize = async () => {
        try {
            const articles = await main();
            const completions = [];

            for (let i = 0; i < articles.length; i++) {
                await complete(articles[i]);
                completions.push(completion);
            }
            setList(completions);
            
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    };

  return (
    <div>
        <Button className="bg-orange-600" onClick={handleSummarize}>
            Summarize HackerNews
        </Button>
        
        <div>{ list }</div>
    </div>
  )
}

export default HackerNewsText