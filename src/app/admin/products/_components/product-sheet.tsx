import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import React from 'react'
import CreateProductForm, { FormValues } from './create-product-form'

import {useMutation, useQueryClient} from '@tanstack/react-query'
import { createProduct } from '@/http/api'


const Productsheet = () => {
  const { toast } = useToast();

  const { isOpen, onClose } = useNewProduct();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ['create-product'],
        mutationFn: (data: FormData) => createProduct(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast({
                title: 'Product created successfully',
            });
            onClose();
        },
    });

    const onSubmit = (values: FormValues) => {
        console.log('values', values);
        const formdata = new FormData();
        formdata.append('name', values.name);
        formdata.append('description', values.description);
        formdata.append('price', String(values.price));
        formdata.append('image', (values.image as FileList)[0]);

        mutate(formdata);
    };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="min-w-[28rem] space-y-4">
                <SheetHeader>
                    <SheetTitle>Create Product</SheetTitle>
                    <SheetDescription>Create a new product</SheetDescription>
                </SheetHeader>
                <CreateProductForm onSubmit={onSubmit} disabled={isPending} />
            </SheetContent>
        </Sheet>
  )
}

export default Productsheet
function useNewProduct(): { isOpen: any; onClose: any } {
  throw new Error('Function not implemented.')
}

function useToast(): { toast: any } {
  throw new Error('Function not implemented.')
}
