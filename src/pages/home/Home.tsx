import React, { useState, useEffect, useCallback } from "react";
import './Home.css';
import Card from '../../components/card/Card';
import { useLoaderData } from 'react-router-dom';

function useDebounce(text : string, delay : number) {
    const [debounceText, setDebounceText] = useState(text);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceText(text);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [text, delay]);

    return debounceText;
}

function Home() {
    const data = useLoaderData() as Product[];
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState<Product[]>(data); 
    const debouncedSearch = useDebounce(search, 500);

    const handleSearch = useCallback(() => {
        const trimmed = debouncedSearch.trim();

        if (trimmed === "") {
            setFilteredData(data);
            return;
        }

        const filtered = data.filter((item) =>
            item.id.toString().includes(trimmed)
        );

        setFilteredData(filtered);
    }, [debouncedSearch, data]);

    useEffect(() => {
        handleSearch();
    }, [debouncedSearch, handleSearch]);

    return (
        <div className="Home-main">
            <div className="Home-searchBar">
                <input type="text" 
                    placeholder="Código do Produto..."
                    className="Home-filterInput"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <div className= "Home-galleryMain">
                {filteredData.length > 0 ? (
                    <div>
                        <div className="Home-gallery">
                            {filteredData.map((item) => (
                            <Card 
                                id={item.id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                category={item.category}
                                pictureUrl={item.pictureUrl}
                            />
                            ))}
                        </div>
                    </div>
                ) : (
                <p className="Home-noneParagraph">Nenhum produto encontrado.</p>
                )}
            </div>
        </div>
    );
}

export default Home;
