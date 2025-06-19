'use client';
import { FormProduct } from '@/components/formProduct/FormProduct';
import { getCategory } from '@/services/category';
import { useQuery } from '@tanstack/react-query';

export default function Create() {
  const { data: dataCategories } = useQuery({
    queryFn: () => getCategory(),
    queryKey: ['categoriesKey'],
  });

  return (
    <div>
      <div className="w-full mt-7 mb-10">
        <h1 className=" text-5xl text-amber-700 rounded-xl">
          Cadastrar produto
        </h1>
      </div>
      <FormProduct type="create" categories={dataCategories} />
    </div>
  );
}
