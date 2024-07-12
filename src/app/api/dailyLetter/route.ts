import { NextResponse } from 'next/server';
import axios from "axios";

export async function GET() {
    try {
        const handleLetter = async () => {
            const response = await axios.get('/api/sendLetter');
    
            if (response.status === 200) {
                const { name, content } = await response.data;
                const res = await axios.post('/api/saveLetter', {
                    name: name,
                    content: content
                })
                console.log(res.data)
            } else {
                // Handle error
                return new NextResponse("error with saveLetter", {status: 500})
            }
        }
        await handleLetter();
        return new NextResponse("working", { status: 200 })
        
    } catch(error) {
        return new NextResponse("error with sendletter", {status: 500})
    }
}