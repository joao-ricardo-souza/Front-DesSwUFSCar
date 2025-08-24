import axios from 'axios';
import { LoaderFunctionArgs } from "react-router-dom";

const API_URL = 'http://localhost:3001/api/product';

export async function homeLoader() : Promise<Product[]> {
  const response = (await axios.get(API_URL)).data as Product[];
  console.log((await axios.get(API_URL)).data);

  return response;
}

export async function editLoader({ request }: LoaderFunctionArgs): Promise<Product> {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
        throw new Error("ID do produto não fornecido");
    }

    const response = await axios.get<Product>(`${API_URL}/${id}`);
    return response.data;
}