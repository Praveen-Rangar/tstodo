import { useState } from "react";
import Content from "./Content";
import Navbar from "./Navbar";

function App() {
  const [settingOpen, setSettingOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  let darkModeClasses;

  if (darkMode === false) {
    darkModeClasses = "";
  } else {              
    darkModeClasses = "bg-black text-white h-screen";
  }

  return (
    <div className={darkModeClasses}>
      <Navbar setSettingOpen={setSettingOpen} settingOpen={settingOpen} />
      <Content
        settingOpen={settingOpen}
        setDarkMode={setDarkMode}
        darkMode={darkMode}
      />
    </div>
  );
}

export default App;
