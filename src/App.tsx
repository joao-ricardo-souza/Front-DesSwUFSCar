import React, { useState } from "react";
import './App.css';
import Card from './components/Card';
import data from './data.json';

function App() {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = () => {
    const trimmed = search.trim();
    const searchNumber = Number(trimmed);
    
    if (trimmed === "") {
      setFilteredData(data);
      return;
    }

    if (isNaN(searchNumber)){
      setFilteredData([])
      return;
    }

    const filtered = data.filter((item) => item.id === searchNumber);
    setFilteredData(filtered);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          FrontEnd - Portal de Produtos
        </p>
        <div>
          <input type="text" 
          placeholder="Código do Produto..."
          className="App-filterInput"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}/>
          <button className="App-filterButton" onClick={handleSearch}>
            Filtrar
          </button>
        </div>
      </header>
      <main className="App-main">
        {filteredData.length > 0 ? (
          <div className="App-gallery">
            {filteredData.map((item) => (
              <Card 
                key={item.id}
                name={item.name}
                price={item.price}
                category={item.category}
                pictureUrl={item.pictureUrl}
              />
            ))}
          </div>
        ) : (
          <p className="App-noneParagraph">Nenhum produto encontrado.</p>
        )}
      </main>
    </div>
  );
}

export default App;
