import Home from "./pages/Home";
import Menu from "./pages/Menu";
import NavBar from "./pages/NavBar";
import { useState } from "react";

function App() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  function openMenu() {
    setIsOpenMenu(true);
  }

  return (
    <div className="w-full h-screen">
      {isOpenMenu ? (
        <Menu />
      ) : (
        <div className="w-full h-screen">
          <NavBar onOpenMenu={openMenu} />
          <div className="p-4 pt-10">
            <Home />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
