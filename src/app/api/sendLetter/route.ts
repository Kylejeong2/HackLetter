import { NextResponse } from "next/server";
import { exec } from "child_process";
import { db } from "@/lib/db";
import { $letters } from "@/lib/db/schema";
import { stderr } from "process";

export async function GET(){
    try {
        // exec("cd 'python files'")
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

        const currLetterInfo: string[] = await letterPromise as string[];
        return NextResponse.json({ "name": currLetterInfo[0], "content": currLetterInfo[1] });
    }
    catch(error){
        console.error(error)
        return new NextResponse("error: letter failed", {status: 500})
    }
}

