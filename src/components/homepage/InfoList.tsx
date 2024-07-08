import React from 'react'
import Typography from '../ui/typography'
import Feature from '../feature'
import { Timer, DollarSign, TrendingUp } from 'lucide-react'

export default function InfoList() {

    return(
    <div className="flex flex-col gap-24 items-center">
        <div className="flex flex-col gap-12 items-center">
            <Typography className="max-w-full mx-auto" variant="h1">
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
    </div>
    )
}