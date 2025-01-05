import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    const data = {message: "APIテスト成功", status:"OK"}

    return NextResponse.json(data,{status: 200})
}

export async function POST(request: Request) {
    try{

        const body = await request.formData();
        const name = body.get("name");
        
        const resOption = {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        }
        
        return new Response(JSON.stringify({message: `受信内容:${name}`}), resOption)
    } catch(error){
        return new Response(JSON.stringify({error: error.message}), {
            status: 400,
            headers: {"Content-Type": "application/json"}
        })
    }
    
}