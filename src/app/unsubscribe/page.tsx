"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function Page() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/unsub', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
        
            if (response.ok) {
                setMessage('Successfully unsubscribed :(');
                setEmail('');
            } else {
                setMessage("You're not subscribed.");
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
      <div className="mx-auto p-6">
        Are you sure you want to leave? <span className="text-orange-600">HackLetter</span> is totally free of charge!
        <div className="p-6">
            <form onSubmit={handleSubmit} className="flex gap-4 items-center">
                <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
                className="flex-grow"
                />
                <Button type="submit" size="sm">
                Unsubscribe
                </Button>
            </form>
        </div>
        {message && <p className="text-sm bg-orange-600 rounded-full px-5 py-3">{message}</p>}

      </div>
    )
  }
  