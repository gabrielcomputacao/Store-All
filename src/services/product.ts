import { Product, ProductDTO } from '@/models/product';

const URL_API = process.env.NEXT_PUBLIC_API_URL;

export async function getProducts(limit: number = 10, offset: number = 0) {
  const result = await fetch(
    `${URL_API}products?limit=${limit}&offset=${offset}`
  );

  if (!result.ok) throw new Error('Erro ao buscar');

  const data = await result.json();
  return data;
}

export async function createProduct(valueProduct: ProductDTO) {
  const result = await fetch(`${URL_API}products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(valueProduct),
  });

  const dataResult = await result.json();

  if (!result.ok) throw new Error(`${dataResult.message}`);

  return result;
}

export async function updateProduct(id: number, valueProduct: ProductDTO) {
  const result = await fetch(`${URL_API}products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(valueProduct),
  });

  const dataResult = await result.json();

  if (!result.ok) throw new Error(`${dataResult.message}`);

  return dataResult;
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
