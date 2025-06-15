'use client';

import { CarouselCustom } from '@/components/carouselCustom/CarouselCustom';
import { getProductId } from '@/services/product';
import { formatToReal } from '@/utils/formatNumberRealBR';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function ProductId() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['productsIdKey'],
    queryFn: () => getProductId(Number(id)),
  });

  return (
    <div className="w-full mt-7 mb-10">
      <h1 className=" text-5xl text-amber-700 rounded-xl">Produto</h1>
      <div>
        <h2 className="my-10 text-3xl">
          <span className="font-semibold">Nome:</span> {data?.title}
        </h2>
        <div className="flex flex-col gap-5">
          <p className="text-xl">
            <span className="font-semibold">Categoria:</span>{' '}
            {data?.category.name}
          </p>
          <p className="text-xl">
            <span className="font-semibold">Preço:</span>{' '}
            {formatToReal(data?.price ?? '')}
          </p>
          <p className="text-xl">
            <span className="font-semibold">Descrição:</span>{' '}
            {data?.description}
          </p>
        </div>
        {data?.images && (
          <div className="my-10">
            <div className="mb-5">
              <h3 className="text-2xl">Imagens do Produto</h3>
            </div>
            <div className="ml-10">
              <CarouselCustom images={data?.images} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
