import React from 'react'
import Typography from '../ui/typography'
import Image from 'next/image'

export default function CTA(){

    return(
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
            src="/Drake.png"
            className='rounded-xl'
          />
        </div>
    )
}