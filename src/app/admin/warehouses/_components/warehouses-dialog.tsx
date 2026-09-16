import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
  } from "@/components/ui/dialog";

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createWarehouse } from '@/http/api'
import { useToast } from '@/hooks/use-toast'
import { useNewWarehouse } from '@/store/warehouse/warehouse.store'
import CreateWarehouseForm, {FormValues} from './create-warehouses-form'
import { Warehouse } from '@/types'

const WarehouseSheet = () => {
    const { toast } = useToast()
    
    const { isOpen, onClose } = useNewWarehouse()
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ['create-warehouse'],
        mutationFn: (data: Warehouse) => createWarehouse(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['warehouses'] });
            toast({
                title: 'Warehouse created successfully',
            });
            onClose();
        },
    })

    const onSubmit = (values: FormValues) => {
        mutate(values as Warehouse);
    };

    return (
        
        <Dialog open={isOpen} onOpenChange={onClose}>
           <DialogContent className="min-w-[28rem] space-y-4">
                <DialogHeader>
                    <DialogTitle>Create Warehouse</DialogTitle>
                    <DialogDescription>Create a new warehouse</DialogDescription>
                </DialogHeader>
                <CreateWarehouseForm onSubmit={onSubmit} disabled={isPending} />
            </DialogContent>
        </Dialog>
        
    )

}

export default WarehouseSheet