'use client';
import { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProductId } from '@/services/product';

interface IDialogCustomCloseProps {
  openDialog: boolean;
  onOpenDialog: Dispatch<SetStateAction<boolean>>;
  idProduct: number;
}

export function DialogCustomClose({
  openDialog,
  onOpenDialog,
  idProduct,
}: IDialogCustomCloseProps) {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteProduct } = useMutation({
    mutationFn: deleteProductId,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productsKey'] });
    },
  });

  async function handleDeleteProduct() {
    try {
      await deleteProduct(idProduct);
    } catch (error) {}
  }

  return (
    <Dialog open={openDialog} onOpenChange={onOpenDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="mb-5">
          <DialogTitle>Deseja deletar este produto?</DialogTitle>
          <DialogDescription>
            Esta ação irá deletar um produto permanentemente.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <Button
            className="bg-green-500 text-white cursor-pointer"
            type="button"
            variant="secondary"
            onClick={handleDeleteProduct}
          >
            Sim
          </Button>
          <DialogClose asChild>
            <Button
              className="bg-red-500 text-white cursor-pointer"
              type="button"
              variant="secondary"
            >
              Não
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
