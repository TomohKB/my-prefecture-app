import { useEffect, useState } from "react";

// ✅ 都道府県の型定義（データの形を指定）
type Prefecture = {
  prefCode: number;
  prefName: string;
};

// ✅ `PrefectureCheckbox` コンポーネントを定義
// 親コンポーネント（App.tsx）から `onSelectPrefecture` を受け取る
const PrefectureCheckbox = ({
  onSelectPrefecture,
}: {
  onSelectPrefecture: (prefCode: number, checked: boolean) => void;
  //checked: boolean → チェックされたかどうか (true / false)
  //void チェック状態を親コンポーネントに伝えるだけで、値を返す必要がない
}) => {
  // ✅ 都道府県のリストを管理するための state
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  //

  useEffect(() => {
    console.log("APIキー:", import.meta.env.VITE_RESAS_API_KEY); // 確認用ログ

    // ✅ 都道府県データを取得する関数
    const fetchPrefectures = async () => {
      try {
        const response = await fetch(
          "https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/prefectures",
          {
            method: "GET",
            headers: {
              "X-API-KEY": import.meta.env.VITE_RESAS_API_KEY,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setPrefectures(data.result); // ✅ APIのレスポンスデータを `setPrefectures` にセット
      } catch (error) {
        console.error("都道府県データの取得に失敗しました", error);
      }
    };

    fetchPrefectures(); // ✅ 関数を実行してデータを取得
  }, []); // ✅ `useEffect` の依存配列を空にして「最初の1回だけ実行」

  return (
    <>
      <h2>都道府県を選択</h2>
      {prefectures.length === 0 ? (
        // ✅ 都道府県のデータがまだない場合、「データ取得中...」と表示
        <p>データを取得中...</p>
      ) : (
        // ✅ `.map()` を使ってチェックボックスリストを作成
        prefectures.map((pref) => (
          <label key={pref.prefCode}>
            <input
              type="checkbox"
              value={pref.prefCode}
              onChange={(e) =>
                onSelectPrefecture(pref.prefCode, e.target.checked)
              }
              // ✅ ユーザーがチェックを入れたら `onSelectPrefecture` を実行
            />
            {pref.prefName}
          </label>
        ))
      )}
    </>
  );
};

export default PrefectureCheckbox;
