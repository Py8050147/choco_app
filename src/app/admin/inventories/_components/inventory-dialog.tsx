// import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
  } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { createInventory } from "@/http/api";
import {useNewInventory } from "@/store/inventory/inventory-store";
import { InventoryData } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CreateInventoryForm, {FormValues} from "./create-inventories-form";

const InventorySheet = () => {
    const { toast } = useToast();

    const { isOpen, onClose } = useNewInventory();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ['create-inventory'],
        mutationFn: (data: InventoryData) => createInventory(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inventories'] });
            toast({
              title: 'Inventory created successfully',
              className: ' text-green-500'
            });
            onClose();
        },
    });

    const onSubmit = (values: FormValues) => {
        mutate(values);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="min-w-[28rem] space-y-4">
          <DialogHeader>
            <DialogTitle>Create Inventory</DialogTitle>
            <DialogDescription>Create a new Inventory</DialogDescription>
          </DialogHeader>
      
          <CreateInventoryForm onSubmit={onSubmit} disabled={isPending} />
        </DialogContent>
      </Dialog>
        // <Dialog open={isOpen} onOpenChange={onClose}>
        //     <DialogContent className="min-w-[28rem] space-y-4">
        //         <SheetHeader>
        //             <SheetTitle>Create Inventory</SheetTitle>
        //             <SheetDescription>Create a new inventory</SheetDescription>
        //         </SheetHeader>
        //         <CreateInventoryForm onSubmit={onSubmit} disabled={isPending} />
        //     </DialogContent>
        // </Dialog>
    );
};

export default InventorySheet


