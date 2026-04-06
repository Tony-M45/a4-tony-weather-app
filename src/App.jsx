import { useState } from "react";
import SearchBar from "./SearchBar";

function App() {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", city);
  };

  return (
    <div>
      <h1>React Weather App</h1>
      <SearchBar city={city} setCity={setCity} onSearch={handleSearch} />
    </div>
  );
}

export default App;