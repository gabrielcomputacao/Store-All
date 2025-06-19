'use client';
import { Category, Product, ProductForm, ProductDTO } from '@/models/product';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { SelectCustom } from '../selectCustom/SelectCustom';
import { Button } from '../ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct, updateProduct } from '@/services/product';
import { useState } from 'react';
import { toast } from 'sonner';

interface IFormProductProps {
  type: 'create' | 'update';
  product?: Product;
  categories?: Category[];
}

export function FormProduct({ type, product, categories }: IFormProductProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductForm>({
    defaultValues: {
      categoryId: Number(product?.id),
      description: product?.description,
      price: product?.price,
      title: product?.title,
    },
  });
  const queryClient = useQueryClient();
  const [arrayImages, setArrayImages] = useState<string[]>([]);

  const { mutateAsync: createProductFn } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productsKey'] });
    },
  });

  const { mutateAsync: updateProductFn } = useMutation({
    mutationFn: async ({
      id,
      valueProduct,
    }: {
      id: number;
      valueProduct: ProductDTO;
    }) => {
      return updateProduct(id, valueProduct);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productsKey'] });
    },
  });

  async function onSubmit(data: ProductForm) {
    const arrayLinkImages = Object.entries(data)
      .filter(([key, _]) => key.startsWith('image'))
      .map(([_, valueImage]) => valueImage);

    console.log(data);

    const dataProductDTO: ProductDTO = {
      title: data.title,
      price: data.price,
      description: data.description,
      categoryId: Number(data.categoryId),
      images: arrayLinkImages,
    };

    if (type === 'update' && product?.id) {
      try {
        const result = await updateProductFn({
          id: Number(product?.id),
          valueProduct: dataProductDTO,
        });

        if (result.status === 200 || result.status === 201) {
          toast.success('Produto atualizado com sucesso!', {
            className: 'bg-green-500 text-white',
          });
        }
      } catch (error) {
        console.log(error);
        toast.error(`${error}`, {
          className: 'bg-red-500 text-white',
        });
      }
    } else {
      try {
        const result = await createProductFn(dataProductDTO);

        if (result.status === 200 || result.status === 201) {
          toast.success('Produto cadastrado com sucesso!', {
            className: 'bg-green-500 text-white',
          });
        }
      } catch (error) {
        toast.error(`${error}`, {
          className: 'bg-red-500 text-white',
        });
      }
    }
    console.log('rew');
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
                      valueCustom={String(product?.category.id ?? field.value)}
                      categories={categories ?? []}
                      defaultValue={String(product?.category.id) ?? field.value}
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
                  defaultValue={product?.price ?? 0}
                />
                {errors.price && (
                  <p className="text-red-500">{errors.price.message}</p>
                )}
              </div>
            </div>
            {type === 'create' && (
              <div className="mt-5 flex flex-col items-start gap-5">
                <Button
                  type="button"
                  onClick={() => {
                    setArrayImages(prev => [
                      ...prev,
                      `image${prev.length + 1}`,
                    ]);
                  }}
                  className="cursor-pointer"
                >
                  Adicionar link para imagem
                </Button>
                <div className="flex flex-col gap-5">
                  {arrayImages.length > 0 &&
                    arrayImages.map((img, index) => (
                      <div>
                        <label htmlFor="images">Link Imagem {index + 1}</label>
                        <Input {...register(`image${Number(index)}`)} />
                      </div>
                    ))}
                </div>
              </div>
            )}
            <div className="flex gap-5">
              <div className="w-full flex flex-col gap-5">
                {type === 'update' &&
                  product?.images &&
                  product?.images.map((img, index) => (
                    <div key={index}>
                      <label key={`label_${index}`} htmlFor="images">
                        Link Imagem {index + 1}
                      </label>
                      <Input
                        key={`input_${index}`}
                        {...register(`image${Number(index)}`)}
                        defaultValue={img ?? ''}
                      />
                    </div>
                  ))}
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
