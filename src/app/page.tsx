import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react';
// import Image from 'next/image'
import Link from 'next/link';

export default function Home() {
  return (
    <div className='bg-gradient-to-r min-h-screen grainy from rose-100 to-teal-100'>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <h1 className='font-semibold text-7xl text-center'>
            HackLetter
        </h1>

        <div className='mt-4'>
          <h2 className='font-semibold text-3xl text-center text-slate-700'>
          </h2> 

          <div className='mt-8'></div>

          <div className='flex justify-center'>
            <Link href="/dashboard">
              <Button className='bg-orange-600'>See the Archives
              <ArrowRight className='ml-2 w-5 h-5' strokeWidth={3}/>
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
