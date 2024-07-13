import { NextResponse } from "next/server";
import { exec } from "child_process";
import { db } from "@/lib/db";
import { $letters } from "@/lib/db/schema";

export async function GET() {
    try {
        // Logic from sendLetter
        const letterPromise = new Promise((resolve, reject) => {
            exec(
                "cd python && source venv/bin/activate && python sendmail.py",
                (error, stdout, stderr) => {
                    if(error){
                        console.error(error)
                        reject(error)
                    }
                    resolve(stdout)
                }
            );
        });

        const rawLetterInfo: string = await letterPromise as string;
        let cleanedString = rawLetterInfo.replace(/^\[|\]$/g, '');
        const htmlStartIndex = cleanedString.indexOf('<');
        let title = cleanedString.slice(0, htmlStartIndex);
        title = title.replace(/^['"]|['"],\s*['"]?$/g, '').trim();
        let htmlContent = cleanedString.slice(htmlStartIndex);
        htmlContent = htmlContent.replace(/['"]?\]?$/g, '').trim();
        htmlContent = htmlContent.replace(/'\]$/g, '').trim();

        // Logic from saveLetter
        const letter_ids = await db.insert($letters).values({
            name: title,
            content: htmlContent
        }).returning({
            insertedId: $letters.id
        });

        return NextResponse.json({
            letter_id: letter_ids[0].insertedId,
            message: "Letter created and saved successfully"
        }, { status: 200 });
    } catch(error) {
        console.error("Error in dailyLetter:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
