import React from "react";
import PrefectureCheckbox from "./components/PrefectureCheckbox";

const App = () => {
  return (
    <>
    <h1>都道府県別人口推移アプリ</h1>
    <p>都道府県を選択して、人口推移を確認できます。</p>
    <PrefectureCheckbox />
    </>
  );
};

export default App;