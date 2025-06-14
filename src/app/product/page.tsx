'use client';
import { CardCustom } from '@/components/cardCustom/CardCustom';
import { Input } from '@/components/ui/input';
import type { Product } from '@/models/product';
import { getProducts } from '@/services/product';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function Product() {
  const [limitPage, setLimitPage] = useState(10);
  const { data, isLoading } = useQuery({
    queryKey: ['productsKey', limitPage],
    queryFn: () => getProducts(limitPage),
  });

  return (
    <div>
      <div className="w-full mt-7 mb-10">
        <h1 className=" text-5xl text-amber-700 rounded-xl">Produtos</h1>
        <div>
          {isLoading ? (
            <></>
          ) : (
            <div className="flex flex-col gap-10 mt-10">
              <div className="flex flex-col gap-1">
                <label htmlFor="limitPage">
                  Selecione o número máximo de produtos a serem buscados
                </label>
                <Input
                  name="limitPage"
                  className="w-fit"
                  type="number"
                  value={limitPage}
                  onChange={e => setLimitPage(Number(e.target.value))}
                />
              </div>

              <div className="flex gap-5 flex-wrap ">
                {data.map((value: Product) => {
                  return (
                    <CardCustom
                      key={value.id}
                      title={value.title}
                      description={value.description}
                      price={value.price}
                      category={value.category.name}
                      images={value.images}
                      id={value?.id}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
