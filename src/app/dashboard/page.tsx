"use client"

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { UserButton, auth } from '@clerk/nextjs';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import axios from "axios";
// import { eq } from 'drizzle-orm';
// import { db } from '@/lib/db';

type Props = {}

const DashboardPage = async (props: Props) => {
    const {userId} = auth()
    const [summaries, setSummaries] = useState<string[]>([]);

    const handleSummarize = async () => {
        try {
            const response = await axios.get('/backend/main');
            setSummaries(response.data);
        } catch (error) {
            console.error('Failed to summarize articles', error);
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
                            <h1 className='text-3xl font-bold text-gray-900'>Title</h1>
                            <div className='w-4'></div>
                            <UserButton />
                        </div>
                    </div>

                    <div className="h-8"></div>

                    <Separator />
                    
                    <Button onClick={handleSummarize}>
                        Summarize HackerNews
                    </Button>

                    <div className="mt-4">
                        {summaries.map((summary, index) => (
                            <div key={index} className="mb-2">
                                {summary}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </>
    
  )
}

export default DashboardPage;