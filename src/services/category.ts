const URL_API = process.env.NEXT_PUBLIC_API_URL;

export async function getCategory(limit: number = 100) {
  const result = await fetch(`${URL_API}categories?limit=${limit}`);

  if (!result.ok) throw new Error('Erro ao buscar');

  const data = await result.json();
  return data;
}
