import "./Edit.css";
import { Form, useNavigate } from "react-router";
import { Button } from "../../components/button/Button";
import axios from 'axios'
import { useLoaderData } from 'react-router-dom';

const API_URL = "http://localhost:3001/api/product";

function Edit() {
    const navigate = useNavigate();
    const product = useLoaderData() as Product;

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

        const updateProduct: NewProduct = {
            name,
            description,
            category,
            price,
            pictureUrl
        };

        try {
            const response = await axios.put(`${API_URL}/${product.id}`, updateProduct);
            console.log("Produto atualizado com sucesso:", response.data);
            navigate("/products");
        } catch (error: any) {
            console.error("Falha ao atualizar produto:", error.response?.data || error.message);
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
                    <input id="name" name="name" type="text" placeholder="Digite o nome do produto" defaultValue={product.name} />
                    <label>Descrição:</label>
                    <textarea id="description" name="description" placeholder="Digite a descrição do produto" defaultValue={product.description} />
                    <label>Categoria:</label>
                    <input id="category" name="category" type="text" placeholder="Digite a categoria do produto"  defaultValue={product.category} />
                    <label>Preço:</label>
                    <input id="price" name="price" type="number" step="0.01" placeholder="Digite o preço do produto"  defaultValue={product.price} />
                    <label>Foto (URL):</label>
                    <input id="photo" name="photo" type="url" placeholder="Digite a URL da foto do produto"  defaultValue={product.pictureUrl} />
                </div>
                <div className="New-buttons">
                    <Button type="submit">Editar</Button>
                    <Button onClick={handleCancel}>Cancelar</Button>
                </div>
            </Form>
        </div>
    );
}

export default Edit;
