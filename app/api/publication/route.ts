import prismadb from "@/lib/db";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"


export async function POST(req: Request){
    try {
        const  { userId} = auth();
        const data  = await req.json()

        if(!userId){
            return  new NextResponse("Unauthorized", {status: 401})
        }

        const publication  = await prismadb.publication.create({
            data: {
                ...data,
                userId
            }
        })

        return NextResponse.json(publication)
        } catch (error) {
            console.log("[Publication]", error)
            return  new NextResponse("Internal Error", {status: 500})
        }
        
    
}