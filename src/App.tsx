import React from "react";
import PrefectureCheckbox from "./components/PrefectureCheckbox";
import PopulationChart from "./components/PopulationChart";
import { useState } from "react";


const App = () => {
  const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([]);
  
  const handleSelectPrefecture = (prefCode: number, checked: boolean) => {
    setSelectedPrefectures((prev) =>
      checked ? [...prev, prefCode]: prev.filter((code) => code !== prefCode)
    );
  }

  return (
    <>
      <h1>都道府県別人口推移アプリ</h1>
      <p>都道府県を選択して、人口推移を確認できます。</p>
      <PrefectureCheckbox onSelectPrefecture={handleSelectPrefecture} />
      <PopulationChart selectedPrefectures={selectedPrefectures} />
    </>
  );
};

export default App;