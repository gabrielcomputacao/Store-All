'use client';
import { FormProduct } from '@/components/formProduct/FormProduct';
import { getCategory } from '@/services/category';
import { getProductId } from '@/services/product';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Update() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: dataCategories } = useQuery({
    queryFn: () => getCategory(),
    queryKey: ['categoriesKey'],
  });

  const { data: dataProductId } = useQuery({
    queryFn: () => getProductId(Number(id)),
    queryKey: ['productsIdKey'],
  });

  return (
    <div>
      <div className="w-full mt-7 mb-10">
        <h1 className=" text-5xl text-amber-700 rounded-xl">
          Atualizar produto
        </h1>
      </div>
      <FormProduct
        type="update"
        product={dataProductId}
        categories={dataCategories}
      />
    </div>
  );
}
