import { useEffect, useState } from "react";
import "./App.css";
import { Lists, MyNav, Home } from "./components";
import { getData } from "./utils/localStorage";
import { Routes, Route } from "react-router-dom";
import { ListContext } from "./context/listContext";
import { updateData } from "./utils/localStorage";

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(getData() || []);
  }, []);

  const updateStorage = (updatedData) =>{
    updateData(updatedData);
    setList(updatedData);
  }
  return (
    <div>
      <MyNav expand="sm" />
      <ListContext.Provider value={{ list, updateStorage }}>
        <div className="App">
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/lists" element={<Lists />} />
          </Routes>
        </div>
      </ListContext.Provider>
    </div>
  );
}

export default App;
