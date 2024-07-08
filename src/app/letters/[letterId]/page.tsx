import { Button } from '@/components/ui/button';
import { clerk } from '@/lib/clerk-server';
import { db } from '@/lib/db';
import { $letters } from '@/lib/db/schema';
import { auth } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
    params: {
        letterId: string;
    }
};

type LetterProps = {
    content: string;
};

const LetterPage = async ({params: { letterId }}: Props) => {
    const {userId} = await auth()
    if (!userId){
        return redirect('/dashboard');
    }

    const user = clerk.users.getUser(userId);

    const letters = await db.select().from($letters).where(
        and(
            eq($letters.id, parseInt(letterId)),
    ))

    if (letters.length != 1) {
        return redirect('/dashboard');
    }

    const letter = letters[0];

    const HackLetterComponent: React.FC<LetterProps> = ({ content }) => {
        return (
          <div dangerouslySetInnerHTML={{ __html: content }} className='text-black rounded-3xl'/>
        );
      };

  return (
    <div className='min-h-screen p-8 w-full'>
        <div className='max-w-7xl mx-auto'>
            <div className='border shadow-xl border-stone-200 rounded-lg p-4 flex items-center w-full bg-slate-900'>
                <Link href="/dashboard">
                    <Button className="bg-orange-600 text-white" size="sm">
                        <ArrowLeft />
                        Back
                    </Button>
                </Link>
                <div className="w-3"></div>
                <span className='font-semibold text-white'>
                    {(await user).firstName} {(await user).lastName}
                </span>
                <span className='inline-block mx-1 text-white'>/</span>
                <span className='text-stone-400 font-semibold'>
                    {letter.name}
                </span>
                <div className="ml-auto">
                </div>
            </div>

            <div className="h-4"></div>
            <div className='border-stone-200 shadow-xl border rounded-lg px-16 py-8 w-full bg-slate-900'>
                {/* HTML content of the letter will go here */}
                <div className='rounded-full'>
                    <HackLetterComponent content={letter.content} />
                </div>
                
            </div>
            
        </div>
    </div>
  )
}

export default LetterPage;