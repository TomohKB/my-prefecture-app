import { useEffect, useState } from "react";
import {
  LineChart, //折れ線グラフ
  Line, //グラフの線
  XAxis, //X軸
  YAxis, //Y軸
  Tooltip, //マウスを当てるとデータが表示
  Legend, //凡例(どの線がどの都道府県か)
  ResponsiveContainer,
} from "recharts";

// ✅ 人口データの型
type PopulationData = {
  year: number;
  value: number;
};

// ✅ 追加：取得するデータの種類を定義
const categories = {
  total: "総人口",
  young: "年少人口",
  working: "生産年齢人口",
  elderly: "老年人口",
};

const PopulationChart = ({
  selectedPrefectures,
}: {
  selectedPrefectures: number[];
}) => {
  const [populationData, setPopulationData] = useState<{
    [key: number]: PopulationData[];
  }>({});
  const [selectedCategory, setSelectedCategory] =
    useState<keyof typeof categories>("total"); // ✅ 追加: データ種別の状態管理

  useEffect(() => {
    const fetchPopulation = async (prefCode: number) => {
      try {
        const response = await fetch(
          `https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/population/composition/perYear?prefCode=${prefCode}`,
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

        // ✅ 選択されたデータ種別のデータを取得
        const populationTypeIndex =
          selectedCategory === "total"
            ? 0
            : selectedCategory === "young"
            ? 1
            : selectedCategory === "working"
            ? 2
            : 3;

        setPopulationData((prev) => ({
          ...prev,
          [prefCode]: data.result.data[populationTypeIndex].data,
        }));
      } catch (error) {
        console.error(`人口データの取得に失敗しました (${prefCode})`, error);
      }
    };

    selectedPrefectures.forEach((prefCode) => fetchPopulation(prefCode));
  }, [selectedPrefectures, selectedCategory]); // ✅ 追加: `selectedCategory` が変わったら再取得

  return (
    <div>
      <h2>人口推移</h2>

      {/* ✅ 追加: データ種別の切り替え UI */}
      <div>
        {Object.entries(categories).map(([key, label]) => (
          <label key={key} style={{ marginRight: "10px" }}>
            <input
              type="radio"
              name="category"
              value={key}
              checked={selectedCategory === key}
              onChange={() =>
                setSelectedCategory(key as keyof typeof categories)
              }
            />
            {label}
          </label>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.entries(populationData).map(([prefCode, data]) => (
            <Line
              key={prefCode}
              dataKey="value"
              data={data}
              name={`都道府県 ${prefCode}`}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PopulationChart;
