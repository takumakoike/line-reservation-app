// webhookとして応答メッセージを送る
export async function POST(request: Request){
	try{
		// LINEへのアクセストークン（.env管理）とエンドポイントURLの指定		
		const LINE_ACCESS_TOKEN = process.env.CHANNEL_ACCESS_TOKEN ? process.env.CHANNEL_ACCESS_TOKEN : process.env.NEXT_PUBLIC_CHANNEL_ACCESS_TOKEN;
		const ENDPOINT_URL = "https://api.line.me/v2/bot/message/reply";

		// 引数リクエストのjson受信
		const requestData = await request.json();
		if(!requestData || !requestData.events) {
				console.log("リクエストデータがありませんでした");
				return new Response("Bad request", {status:400});
		}
		// リクエストデータがあったときに、eventプロパティを取得しておく。
		const events = requestData.events;
		for (const event of events) {
				if(event.type === "message" && event.message.text === "予約"){
						const REPLY_TOKEN = event.replyToken;
						const userMessage = event.message.text;

						const options = {
								method: "POST",
								headers: {
										"Content-Type": "application/json",
										"Authorization": `Bearer ${LINE_ACCESS_TOKEN}`
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
												},
												{
														"type": "flex",
														"altText": "フレックスメッセージ",
														"contents": {
																"type": "bubble",
																"size": "giga",
																// ヘッダーパーツ
																"header": {
																		"type": "box",
																		"layout": "vertical",
																		"contents": [
																				{
																						"type": "text",
																						"text": "Bearnet｜予約"
																				},
																		]
																},
																// ボディーパーツ
																"body": {
																		"type": "box",
																		"layout": "vertical",
																		"contents": [
																				{
																						"type": "text",
																						"text": "希望日を下のボタンから選んでください"
																				}
																		]
																},
																// フッターパーツ
																"footer" : {
																		"type": "box",
																		"layout": "vertical",
																		"contents" :[
																			{
																				"type": "button",
																				"style": "primary",
																				"action": {
																					"type": "postback",
																					"label": "today",
																					"displayText": "今日の予約"
																				}
																					},
																			{
																				"type": "button",
																				"style": "secondary",
																				"action": {
																						"type": "text",
																						"label": "明日の予約",
																						"text": "tomorrow",
																				}
																			},
																			{
																				"type": "button",
																				"style": "link",
																				"action": {
																					"type": "datetimepicker",
																					"label": "日時を指定する",
																					"data": "action=selectedData",
																					"mode": "datetime",
																				}
																			}
																		]
																},
																// 全体のスタイル定義
																"styles": {
																		"header":{
																				"backgroundColor": "#f0f8ff"
																		},
																		"body": {
																				"backgroundColor": "#ffff00"
																		},
																		"footer": {
																				"separator": true,
																				"backgroundColor": "#7fff00"
																		}
																}
														}
														
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