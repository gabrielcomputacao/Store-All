'use client';
import { Product } from '@/models/product';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { SelectCustom } from '../selectCustom/SelectCustom';
import { Button } from '../ui/button';

interface IFormProductProps {
  type: 'create' | 'update';
  product?: Product;
}

export function FormProduct({ type, product }: IFormProductProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Product>();

  function onSubmit(data: Product) {
    console.log(data);
  }

  return (
    <div className=" flex justify-center w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="max-w-[1210px] w-full">
          <div className="flex flex-col border border-gray-200 p-5 gap-5">
            <div className="flex gap-5">
              <div className="w-full max-w-1/2">
                <label htmlFor="title">Título</label>
                <Input
                  {...register('title', { required: true })}
                  defaultValue={product?.title ?? ''}
                />
                {errors.title && (
                  <p className="text-red-500">{errors.title.message}</p>
                )}
              </div>
              <div className="w-full max-w-1/3">
                <label htmlFor="categoryId">Categoria</label>
                <Controller
                  name="categoryId"
                  control={control}
                  render={({ field }) => (
                    <SelectCustom
                      onValueChangeCustom={field.onChange}
                      valueCustom={product?.categoryId ?? field.value}
                    />
                  )}
                />
              </div>
              <div className="w-full">
                <label htmlFor="price">Preço</label>
                <Input
                  {...register('price')}
                  onBeforeInput={e => {
                    if (/[a-zA-Z]/.test(e.data)) {
                      e.preventDefault();
                    }
                  }}
                  defaultValue={product?.price ?? ''}
                />
                {errors.price && (
                  <p className="text-red-500">{errors.price.message}</p>
                )}
              </div>
            </div>
            <div className="flex gap-5">
              <div className="w-full">
                <label htmlFor="images">Link Imagem</label>
                <Input
                  {...register('images')}
                  defaultValue={product?.images ?? ''}
                />
              </div>
            </div>
            <div>
              <label htmlFor="description">Descrição</label>
              <Textarea
                {...register('description')}
                defaultValue={product?.description ?? ''}
              />
            </div>
            <div className="flex justify-center">
              <Button
                className="cursor-pointer hover:bg-green-700 w-fit px-12 mt-5 py-5 bg-amber-600 text-2xl"
                type="submit"
              >
                {type === 'create' ? 'Criar' : 'Atualizar'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
