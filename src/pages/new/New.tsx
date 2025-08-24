import "./New.css";
import { Form, useNavigate } from "react-router";
import { Button } from "../../components/button/Button";
import axios from 'axios'

const API_URL = "http://localhost:3001/api/product";

function New() {
    const navigate = useNavigate();

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate("/products");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        const name = (form.elements.namedItem("name") as HTMLInputElement)?.value || "";
        const description = (form.elements.namedItem("description") as HTMLTextAreaElement)?.value || "";
        const category = (form.elements.namedItem("category") as HTMLInputElement)?.value || "";
        const price = Number((form.elements.namedItem("price") as HTMLInputElement)?.value) || 0;
        const pictureUrl = (form.elements.namedItem("photo") as HTMLInputElement)?.value || "";

        const newProduct: NewProduct = {
            name,
            description,
            category,
            price,
            pictureUrl
        };

        try {
            const response = await axios.post(API_URL, newProduct);
            console.log("Produto criado com sucesso:", response.data);
            navigate("/products");
        } catch (error: any) {
            console.error("Falha ao criar produto:", error.response?.data || error.message);
        }
    }

    return (
        <div className="New-main">
            <Form 
                action="/products"
                method="post"
                id="NewProductForm"
                onSubmit={handleSubmit}
            >
                <div className="New-body">
                    <label>Nome:</label>
                    <input id="name" name="name" type="text" placeholder="Digite o nome do produto" />
                    <label>Descrição:</label>
                    <textarea id="description" name="description" placeholder="Digite a descrição do produto" />
                    <label>Categoria:</label>
                    <input id="category" name="category" type="text" placeholder="Digite a categoria do produto" />
                    <label>Preço:</label>
                    <input id="price" name="price" type="number" step="0.01" placeholder="Digite o preço do produto" />
                    <label>Foto (URL):</label>
                    <input id="photo" name="photo" type="url" placeholder="Digite a URL da foto do produto" />
                </div>
                <div className="New-buttons">
                    <Button type="submit">Criar</Button>
                    <Button onClick={handleCancel}>Cancelar</Button>
                </div>
            </Form>
        </div>
    );
}

export default New;
