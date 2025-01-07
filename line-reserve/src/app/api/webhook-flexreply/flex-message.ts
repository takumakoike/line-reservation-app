export function createflexMessageBody(replyToken: string, userMessage: string|null){
    return {
        "replyToken": replyToken,
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
                                    "data": "action=today",
                                    "displayText": "今日の予約"
                                }
                            },
                            {
                                "type": "button",
                                "style": "secondary",
                                "action": {
                                        "type": "message",
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
    }
}