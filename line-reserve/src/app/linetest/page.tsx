"use client";

export default function lineTop() {
    // ページ遷移させず、ボタンクリックでメッセージ送信させるためのasync関数の定義
    const sendPushMessage = async () => {
        try {
            // apiをfetchメソッドで叩く
            const response = await fetch("../api/line-test/", {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: 'Hello LINE!' }),
            })

            // fetch結果に対するエラー処理
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "送信に失敗")
            }

            alert("LINEでメッセージを送信しました");
        } catch (e: unknown) {
            console.error(e);
            const errorMessage = e instanceof Error ? e.message : "Unknown error occurred";
            alert(`実行エラー：${errorMessage}`);
        }
    }

    return (
        <div>
            <button type="button" onClick={sendPushMessage}>ブロードキャストメッセージ送信</button>
            <p>※現在はトークン情報を更新しているためメッセージは送信されません</p>
        </div>
    )
}