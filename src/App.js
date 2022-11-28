import { Routes, Route } from "react-router-dom";
import BooksList from "./Screen/booksList";
import ChapterList from "./Screen/chapterList";


function App() {
  return (
    <Routes>
      <Route path="/" element={<BooksList />} />
      <Route path="/ChapterList" element={<ChapterList />} />
    </Routes>
  );
}

export default App;
