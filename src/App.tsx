import Hero from "./components/Hero";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Search from "./pages/Search";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/pages/Search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
