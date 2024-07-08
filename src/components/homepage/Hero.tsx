"use client"

import { useState } from 'react';
import Typography from '../ui/typography';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Image from 'next/image';
import Link from 'next/link';

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
        setMessage('Subscription failed. Please try again.');
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" size="sm" color="primary">
          Subscribe
        </Button>
      </form>
      {message && <p className="text-sm">{message}</p>}
      <Link href="/" target="_blank">
        <Button size="sm" color="ghost">
          View Archive
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
  );
}