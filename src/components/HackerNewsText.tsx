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

    const handleSummarize = () => {
        main().then(articles => {
            // for(let i = 0; i < articles.length; i++){
            //     complete(articles[i]);
            //     completions.push(completion)
            // }
            complete(articles[3])
            completions.push(completion)
            setList(completions)
            
        }).catch(error => {
            console.error("Error fetching articles:", error);
        });
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