'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { formatToReal } from '@/utils/formatNumberRealBR';
import { Trash, Edit } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { DialogCustomClose } from '../dialogCustom/DialogCustomClose';

interface ICardCustomProps {
  title: string;
  description?: string;
  price: number;
  images: string[];
  category: string;
  id?: string;
}

export function CardCustom({
  title,
  description,
  images,
  category,
  price,
  id,
}: ICardCustomProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleDialogOpen() {
    setIsDialogOpen(prev => !prev);
  }

  return (
    <>
      <Card className="w-[350px] max-w-sm py-0 pb-5">
        <Link href={id ? `product/${id}` : '#'}>
          <div className="w-full rounded-t-xl h-[250px]">
            <img
              className="w-full h-full object-cover rounded-t-xl"
              src={images[0]}
              alt={description}
            />
          </div>
          <div className="pt-5">
            <CardHeader>
              <h1 className="text-2xl">{title}</h1>
            </CardHeader>

            <CardContent>
              <div className="w-full flex flex-col py-5">
                <div>
                  <p>
                    <span className="font-semibold">Categoria:</span> {category}
                  </p>
                  <p>
                    <span className="font-semibold">Preço:</span>{' '}
                    {formatToReal(price)}
                  </p>
                  <p>
                    <span className="font-semibold">Descrição:</span>{' '}
                    {description}
                  </p>
                </div>
              </div>
            </CardContent>
          </div>
        </Link>
        <CardFooter className="flex justify-end gap-4">
          <Link href={`/product/update/${id}`}>
            <Button className="w-10 h-10 cursor-pointer hover:bg-gray-400">
              <Edit />
            </Button>
          </Link>

          <Button
            onClick={handleDialogOpen}
            className="w-10 h-10 bg-red-500 hover:bg-gray-400 cursor-pointer"
          >
            <Trash color="#fff" />
          </Button>
        </CardFooter>
      </Card>
      <DialogCustomClose
        openDialog={isDialogOpen}
        onOpenDialog={handleDialogOpen}
        idProduct={Number(id)}
      />
    </>
  );
}
