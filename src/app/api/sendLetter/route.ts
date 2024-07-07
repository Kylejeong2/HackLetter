import { NextResponse } from "next/server";
import { exec } from "child_process";

export const runtime = "edge";

export async function GET(){
    try {
        const letterPromise = new Promise((resolve, reject) => {
            exec(
                "cd 'python files' && source venv/bin/activate && python sendmail.py",
                (error, stdout, stderr) => {
                    if(error){
                        console.error(error)
                        reject(error)
                    }
                    resolve(stdout)
                }
            );
        })

        const rawLetterInfo: string = await letterPromise as string;
        // Remove the outer square brackets
        let cleanedString = rawLetterInfo.replace(/^\[|\]$/g, '');

        // Find the index of the first '<' character, which marks the start of HTML
        const htmlStartIndex = cleanedString.indexOf('<');

        // Extract and clean the title
        let title = cleanedString.slice(0, htmlStartIndex);
        title = title.replace(/^['"]|['"],\s*['"]?$/g, '').trim();

        // Extract and clean the HTML content
        let htmlContent = cleanedString.slice(htmlStartIndex);
        htmlContent = htmlContent.replace(/['"]?\]?$/g, '').trim();
        htmlContent = htmlContent.replace(/'\]$/g, '').trim();

        // Combine into the final array
        const currLetterInfo: string[] = [title, htmlContent];
        console.log(currLetterInfo)

        return NextResponse.json({ "name": currLetterInfo[0], "content": currLetterInfo[1] });
    }
    catch(error){
        console.error(error)
        return new NextResponse("error: letter failed", {status: 500})
    }
}
