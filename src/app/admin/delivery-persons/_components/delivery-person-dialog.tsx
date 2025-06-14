// import {
//     Sheet,
//     SheetContent,
//     SheetDescription,
//     SheetHeader,
//     SheetTitle,
// } from '@/components/ui/sheet';
import { Dialog, DialogTrigger, DialogHeader, DialogContent, DialogDescription } from '@/components/ui/dialog';
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDeliveryPerson } from '@/http/api';
import { useToast } from '@/hooks/use-toast';
import { DeliveryPerson } from '@/types';
import { useNewDeliveryPerson } from '@/store/deliveryPerson/delivery-person-store';
import CreateDeliveryPersonForm, { FormValues } from './create-delivery-person-form';
import { DialogTitle } from '@radix-ui/react-dialog';


const DeliveryPersonSheet = () => {
  const { toast } = useToast();

  const { isOpen, onClose } = useNewDeliveryPerson();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ['create-delivery-person'],
        mutationFn: (data: DeliveryPerson) => createDeliveryPerson(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['delivery-person'] });
            toast({
                title: 'Delivery person created successfully',
            });
            onClose();
        },
    });

    const onSubmit = (values: FormValues) => {
        mutate(values as DeliveryPerson);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="min-w-[28rem] space-y-4">
          <DialogHeader>
            <DialogTitle>Create Delivery Person</DialogTitle>
            <DialogDescription>Create a new Delivery Person</DialogDescription>
          </DialogHeader>
      
          <CreateDeliveryPersonForm onSubmit={onSubmit} disabled={isPending} />
        </DialogContent>
      </Dialog>
    // <Sheet open={isOpen} onOpenChange={onClose}>
    //         <SheetContent className="min-w-[28rem] space-y-4">
    //             <SheetHeader>
    //                 <SheetTitle>Create Delivery Person</SheetTitle>
    //                 <SheetDescription>Create a new delivery person</SheetDescription>
    //             </SheetHeader>
    //             <CreateDeliveryPersonForm onSubmit={onSubmit} disabled={isPending} />
    //         </SheetContent>
    //     </Sheet>
  )
}

export default DeliveryPersonSheet

