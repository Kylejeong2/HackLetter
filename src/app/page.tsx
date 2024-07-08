// import { Button } from '@/components/ui/button'
// import { ArrowRight } from 'lucide-react';
// // import Image from 'next/image'
// import Link from 'next/link';

// export default function Home() {
//   return (
//     <div className='bg-gradient-to-r min-h-screen grainy from rose-100 to-teal-100'>
//       <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
//         <h1 className='font-semibold text-7xl text-center'>
//             HackLetter
//         </h1>

//         <div className='mt-4'>
//           <h2 className='font-semibold text-3xl text-center text-slate-700'>
//           </h2> 

//           <div className='mt-8'></div>

//           <div className='flex justify-center'>
//             <Link href="/dashboard">
//               <Button className='bg-orange-600'>See the Archives
//               <ArrowRight className='ml-2 w-5 h-5' strokeWidth={3}/>
//               </Button>
//             </Link>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }


import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'
import Image from 'next/image'
import Feature from '@/components/feature'
import { ArrowUp, ArrowUpDown, DollarSign, Timer, TrendingUp, Workflow } from 'lucide-react'
import Link from 'next/link'
import Roadmap from '@/components/Roadmap'

export default function Home() {
  return (
    <div
      className="flex flex-col h-full md:py-36 md:px-32 pt-11 pb-24 px-8
        w-full items-center text-center gap-12"
    >
      <div className="flex flex-col gap-6 items-center">
        <Typography className="max-w-2xl" variant="h1">
          The Best of <span className='text-orange-600 font-bold'>HackerNews</span> right in your Inbox.
        </Typography>
        <Typography className="max-w-2xl" variant="h5">
          Enter your email and get the Top 5 stories on HackerNews,
          Summarized with AI and sent right to your Inbox. Read
          the past HackLetters through the <span className='text-orange-600'>Archive</span>.
        </Typography>
        <Link
          href="/"
          target="_blank"
        >
          <Button size="sm" color="ghost">
            {`Subscribe`}
          </Button>
        </Link>
        <Image
          width={1024}
          height={632}
          alt="hero"
          src="/HackletterHero.png"
          className='rounded-xl'
        />
      </div>
      <div className="flex flex-col md:pt-24 md:gap-36 gap-24 items-center">
        <div className="flex flex-col gap-12 items-center">
          <Typography className="max-w-2xl" variant="h1">
            Love <span className='text-orange-600'>HackerNews</span>, but don't want to scroll all day? ⏰
          </Typography>
          <div className="flex md:flex-row flex-col gap-12">
            <Feature
              icon={<Timer size={24} />}
              headline="Save HOURS every week."
              description="Only read summarizes of the top stories + read the articles yourself linked through the email."
            />
            <Feature
              icon={<DollarSign size={24} />}
              headline="Costs $0.00 to Subscribe."
              description="Yep, that's right! HackLetter is total free for all users, just subscribe with your email and start saving time!"
            />
            <Feature
              icon={<TrendingUp size={24} />}
              headline="See the Old Trends."
              description="With the Archive, read past HackLetters and see what used to be popular, and what's not so popular anymore."
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 max-w-2xl items-center">
          <Typography className="max-w-2xl" variant="h1">
            Literally <span className='text-orange-600'>JUST</span> your Email.
          </Typography>
          <Typography className="max-w-2xl" variant="p">
            Outlook, Gmail, Edu, even Hotmail! That's all you'll need to start getting HackLetters sent to your 
            inbox every morning (PST).
          </Typography>
          <Image
            width={1024}
            height={632}
            alt=" "
            src="/HackLetterSS.png"
          />
        </div>
        <div className="flex flex-col gap-6 items-center">
          <Typography className="max-w-2xl" variant="h1">
            Current Roadmap
          </Typography>
          <div>This is what's up with HackLetter, from the start!</div>
            <Roadmap />
        </div>
      </div>
    </div>
  )
}
