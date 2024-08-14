"use client"

import { useState } from 'react';
import Typography from '../ui/typography';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Image from 'next/image';
import styled from "styled-components";
import { keyframes } from "styled-components";

const hue = keyframes`
 from {
   -webkit-filter: hue-rotate(0deg);
 }
 to {
   -webkit-filter: hue-rotate(-360deg);
 }
`;
const AnimatedGradientText = styled.h3`
  color: #f35626;
  background-image: -webkit-linear-gradient(92deg, #f35626, #feab3a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-animation: ${hue} 5s infinite linear;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-feature-settings: "kern";
  font-size: 15px;
  font-weight: 700;
  line-height: 48px;
  overflow-wrap: break-word;
  text-align: center;
  text-rendering: optimizelegibility;
  -moz-osx-font-smoothing: grayscale;
`;

export default function Hero() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setMessage('Successfully subscribed!');
        setEmail('');
      } else {
        setMessage("You've already subscribed! Thanks for your support!");
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center">
      <Typography className="max-w-2xl" variant="h1">
        The Best of <span className='text-orange-600 font-bold'>HackerNews</span> right in your Inbox.
      </Typography>
      <Typography className="max-w-2xl" variant="h5">
        Enter your email and get the Top 5 stories on HackerNews,
        Summarized with AI and sent right to your Inbox. Read
        the past HackLetters through the <span className='text-orange-600'>Archive</span>.
      </Typography>
      {/* <form onSubmit={handleSubmit} className="flex gap-4 items-center">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          required
          className="flex-grow"
        />
        <Button type="submit" size="sm">
          <AnimatedGradientText>Subscribe</AnimatedGradientText>
        </Button>
      </form> */}
      <div>Sorry Hackletter is now closed. View the archive to see what was.</div>
      {message && <p className="text-sm bg-orange-600 rounded-full px-10 py-3">{message}</p>}

      <a href="https://www.producthunt.com/posts/hackletter?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-hackletter" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=467875&theme=light" alt="HackLetter - HackerNews&#0032;summarized&#0032;and&#0032;sent&#0032;to&#0032;your&#0032;inbox&#0032;daily&#0046; | Product Hunt" width="250" height="54" /></a>
      <Image
        width={1024}
        height={632}
        alt="hero"
        src="/HackletterHero.png"
        className='rounded-xl'
      />
    </div>
  );
}