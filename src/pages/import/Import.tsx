import "./Import.css";
import { useNavigate } from "react-router";
import { Button } from "../../components/button/Button";
import { useRef, useState } from "react";
import ImportCard from "../../components/importCard/ImportCard";
import Papa from "papaparse";
import axios from 'axios'

const API_URL = "http://localhost:3001/api/product";

function Import() {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [importData, setImportData] = useState<ImportProduct[]>([]);
    const [selectedData, setSelectedData] = useState<ImportProduct[]>([]);

    const handleImportClick = async () => {
        try {
            await Promise.all(
            selectedData.map(async (product) => {
                const response = await axios.post(API_URL, {
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                pictureUrl: product.pictureUrl
                });
                console.log("Produto criado com sucesso:", response.data);
            })
            );

            navigate("/");
        } catch (error: any) {
            console.error(
            "Falha ao criar produto:",
            error.response?.data || error.message
            );
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) { return; }

        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target?.result;
            if (typeof text === "string") {
                const parsed = Papa.parse<string[]>(text, {
                    header: true,
                    skipEmptyLines: true,
                    delimiter: ";"
                });

                const products: ImportProduct[] = parsed.data.map((row) => ({
                    selected: true,
                    name: row[0],
                    description: row[1],
                    price: parseFloat(row[2]),
                    category: row[3],
                    pictureUrl: row[4]
                }));

                setImportData(products);
            }
        };

        reader.readAsText(file);
    };

    return (
        <div className="New-main">
            <div>
                <Button onClick={handleButtonClick}>Importar .CSV</Button>
                <input
                    type="file"
                    accept=".csv"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}/>
            </div>
            <div className= "Home-galleryMain">
                {importData.length > 0 ? ( 
                    <div>
                        <div className="Home-gallery">
                        {importData.map((item, i) => (
                            <ImportCard
                                key={i}
                                selected={item.selected}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                category={item.category}
                                pictureUrl={item.pictureUrl}
                                onToggle={() => {
                                const newProducts = [...importData];
                                newProducts[i] = {
                                    ...newProducts[i],
                                    selected: !newProducts[i].selected
                                };
                                setImportData(newProducts);
                                setSelectedData(newProducts.filter(p => p.selected));
                                }}
                            />
                            ))}
                    </div>
                    <Button onClick={handleImportClick}>Import</Button>
                    </div>) : (
                    <p className="Home-noneParagraph">Nenhum arquivo selecionado.</p>) }
                
            </div>
        </div>
    );
}

export default Import;
