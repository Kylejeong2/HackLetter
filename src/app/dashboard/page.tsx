import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { $letters } from '@/lib/db/schema';
// import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
// import CreateButton from '@/components/tools/CreateButton';

type Props = {}

const DashboardPage = async (props: Props) => {
    const letters = await db.select().from($letters);

  return (
    <>
        <div className='min-h-screen'>
            <div className='max-w-7xl mx-auto p-10'>
                <div className='min-h-screen'>
                    <div className='flex justify-between items-center md:flex-row flex-col'>
                        <div className='flex items-center'>
                            <Link href="/">
                                <Button className='bg-orange-600 text-white' size="sm"><ArrowLeft className='mr-1 w-4 h-4'/>Back</Button>
                            </Link>

                            <div className='w-4'></div>
                            <h1 className='text-3xl font-bold text-white'>HackLetter Archives</h1>
                            <div className='w-4'></div>
                        </div>
                    </div>

                    <div className="h-8"></div>

                    <Separator />

                    <div className="mt-4"></div>

                    <div className='grid sm:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-3'>
                        {/* <CreateButton /> */}
                        {letters.map(letter => {
                            return (
                                <a href={`/letters/${letter.id}`} key={letter.id}>
                                    <div className='border bg-slate-900 border-stone-200 rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition hover:-translate-y-1'>
                                        {/* <img 
                                            width={400}
                                            height={200}
                                            alt={letter.name}
                                            src={letter.imageUrl || ""}
                                        /> */}
                                    <div className='p-4'>
                                        <h3 className='text-xl font-semibold text-white'>{letter.name}</h3>
                                        <div className='h-1'></div>
                                        <p className='text-sm text-gray-500'>
                                            {new Date(letter.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    </div>
                                </a>
                            )
                        })}
                        </div>
                </div>
            </div>
        </div>
    </>
    
  )
}

export default DashboardPage;