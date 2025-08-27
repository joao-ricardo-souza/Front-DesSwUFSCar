import axios from 'axios';

const API_URL = 'http://localhost:3001/api/product';

export async function homeLoader() : Promise<Product[]> {
  const response = (await axios.get(API_URL)).data as Product[];
  console.log((await axios.get(API_URL)).data);

  return response;
}