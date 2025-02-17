// webhookとして応答メッセージを送る
export async function POST(request: Request){
    try{
        const CHANNEL_ACCESS_TOKEN = process.env.CHANNEL_ACCESS_TOKEN!;
        const ENDPOINT_URL = "https://api.line.me/v2/bot/message/reply";

        const requestData = await request.json();
        if(!requestData || !requestData.events) {
            console.log("リクエストデータがありませんでした");
            return new Response("Bad request", {status:400});
        }
        const events = requestData.events;
        for (const event of events) {
            if(event.type === "message"){
                const REPLY_TOKEN = event.replyToken;
                const userMessage = event.message.text;

                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${CHANNEL_ACCESS_TOKEN}`
                    },
                    body: JSON.stringify({
                        "replyToken": REPLY_TOKEN,
                        "messages": [
                            {
                                "type": "text",
                                "text": `Hi! ${userMessage}だね！`
                            },
                            {
                                "type": "text",
                                "text": "希望日を教えてください"
                            }
                        ]
                    })
                }
                const response = await fetch(ENDPOINT_URL, options);

                if(!response.ok){
                    const errorData = await response.json();
                    console.error(
                        `APIエラー：${errorData || "詳細不明"}`
                    )
                }
            }
        }
    } catch(e: unknown){
        const errorMessage = e instanceof Error ? e.message : "不明なエラー";
        const responseStatus = {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        }
        return new Response(JSON.stringify({error: errorMessage}), responseStatus)
    }
}