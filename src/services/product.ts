import { Product } from '@/models/product';

const URL_API = process.env.NEXT_PUBLIC_API_URL;

export async function getProducts(limit: number = 10, offset: number = 0) {
  const result = await fetch(
    `${URL_API}products?limit=${limit}&offset=${offset}`
  );

  if (!result.ok) throw new Error('Erro ao buscar');

  const data = await result.json();
  return data;
}
