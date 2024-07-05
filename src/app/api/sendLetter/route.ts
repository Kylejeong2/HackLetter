import { NextResponse } from "next/server";
import { exec } from "child_process";
import { stderr } from "process";

export async function GET(){

    try {
        exec(
            "source venv/bin/activate && python sendmail.py",
            (error, stdout, stderr) => {
                if(error){
                    console.error(error)
                }
            }
        );
        return NextResponse.json({})
    }
    catch(error){
        console.error(error)
        return new NextResponse("error: letter failed", {status: 500})
    }

}
