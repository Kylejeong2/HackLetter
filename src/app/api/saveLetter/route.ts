import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { $letters } from "@/lib/db/schema";

export async function POST(req: Request){
    const body = await req.json(); // Add await here
    const { name, content } = body;

    const letter_ids = await db.insert($letters).values({
        name, //string
        content   //string
    }).returning({
        insertedId: $letters.id
    })

    return NextResponse.json({
        letter_id: letter_ids[0].insertedId,
    });
}