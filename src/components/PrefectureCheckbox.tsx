import { useEffect, useState } from "react";

type Prefecture = {
  prefCode: number;
  prefName: string;
};

const PrefectureCheckbox = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);

useEffect(() => {
  console.log("APIキー:", import.meta.env.VITE_RESAS_API_KEY); // 確認用ログ
  const fetchPrefectures = async () => {
    try {
      const response = await fetch(
        "https://yumemi-frontend-engineer-codecheck-api.vercel.app/",
        {
          headers: { "X-API-KEY": import.meta.env.VITE_RESAS_API_KEY },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setPrefectures(data.result);
    } catch (error) {
      console.error("都道府県データの取得に失敗しました", error);
    }
  };

  fetchPrefectures();
}, []);

  return (
    <>
      <h2>都道府県を選択</h2>
      {prefectures.length === 0 ? (
        <p>データを取得中...</p>
      ) : (
        prefectures.map((pref) => (
          <label key={pref.prefCode}>
            <input type="checkbox" value={pref.prefCode} />
            {pref.prefName}
          </label>
        ))
      )}
    </>
  );
};

export default PrefectureCheckbox;
