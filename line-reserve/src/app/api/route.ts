import { NextResponse } from "next/server";

export async function GET(){
    const data = {message: "APIテスト成功", status:"OK"}

    return NextResponse.json(data,{status: 200})
}