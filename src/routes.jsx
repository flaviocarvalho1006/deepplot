import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Detalhes from "./pages/Detalhes/Detalhes";
import Favoritos from "./pages/Favoritos/Favoritos";
import NaoEncontrada from "./pages/NaoEncontrada/NaoEncontrada";
import Header from "./components/Header/Header";

function AppRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filme/:id" element={<Detalhes />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="*" element={<NaoEncontrada />} />
      </Routes>
    </>
  );
}

export default AppRoutes;