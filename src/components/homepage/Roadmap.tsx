import React from 'react'
import { Tweet } from "react-tweet"; 
import Typography from '../ui/typography';

export default function Roadmap() {
  return (
    <div className="flex flex-col gap-6 items-center">
          <Typography className="max-w-2xl" variant="h1">
            Current Roadmap
          </Typography>
          <div>This is what's up with HackLetter, from the start!</div>
            <div className="flex min-h-screen-xl flex-col items-center justify-between p-24 text-left">
              <Tweet id="1807661811854127510" />
              <Tweet id="1808740653947629861" />
              <Tweet id="1808690306952613978" />
              <Tweet id="1810010182782689309" />
            </div>
        </div>
   
  );
}
