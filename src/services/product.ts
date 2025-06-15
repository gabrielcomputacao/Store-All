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

export async function getProductId(id: number): Promise<Product> {
  const result = await fetch(`${URL_API}products/${id}`);

  if (!result.ok) throw new Error('Erro ao buscar');

  const data = await result.json();
  return data;
}

export async function deleteProductId(id: number) {
  const result = await fetch(`${URL_API}products/${id}`, {
    method: 'delete',
  });

  if (!result.ok) throw new Error('Erro ao buscar');

  return true;
}
