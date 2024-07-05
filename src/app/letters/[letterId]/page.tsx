import { Button } from '@/components/ui/button';
import { clerk } from '@/lib/clerk-server';
import { db } from '@/lib/db';
import { $letters } from '@/lib/db/schema';
import { auth } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
    params: {
        letterId: string;
    }
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

  return (
    <div className='min-h-screen grainy p-8'>
        <div className='max-w-4xl mx-auto'>
            <div className='border shadow-xl border-stone-200 rounded-lg p-4 flex items-center'>
                <Link href="/dashboard">
                    <Button className="bg-green-600" size="sm">
                        Back
                    </Button>
                </Link>
                <div className="w-3"></div>
                <span className='font-semibold'>
                    {(await user).firstName} {(await user).lastName}
                </span>
                <span className='inline-block mx-1'>/</span>
                <span className='text-stone-500 font-semibold'>
                    {letter.name}
                </span>
                <div className="ml-auto">
                </div>
            </div>

            <div className="h-4"></div>
            <div className='border-stone-200 shadow-xl border rounded-lg px-16 py-8 w-full'>
            </div>
            
        </div>
    </div>
  )
}

export default LetterPage;