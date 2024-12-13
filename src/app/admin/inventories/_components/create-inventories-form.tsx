import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'

import {
    Form,
    FormControl,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { Product, Warehouse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
import { inventorySchema } from '@/lib/validators/inventorySchema';
import { getAllPWarehouses, getAllProducts } from '@/http/api';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';


export type FormValues = z.input<typeof inventorySchema>;

const CreateInventoryForm = ({
    onSubmit,
    disabled,
}: {
    onSubmit: (formValus: FormValues) => void;
    disabled: boolean;
    }) => {
    
        const form = useForm<z.infer<typeof inventorySchema>>({
            resolver: zodResolver(inventorySchema),
            defaultValues: {
                sku: '',
            },
        });
    
        const { data: warehouses, isLoading: isWarehousesLoading } = useQuery<Warehouse[]>({
            queryKey: ['warehouses'],
            queryFn: () => getAllPWarehouses(),
        });
    
        const { data: products, isLoading: isProductsLoading } = useQuery<Product[]>({
            queryKey: ['products'],
            queryFn: getAllProducts,
        });
    
        const handleSubmit = (values: FormValues) => {
            onSubmit(values);
        };
    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>SKU</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g. CH123456" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="warehouseId"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Warehouse ID</FormLabel>
                            <Select
                                onValueChange={(value: string) => field.onChange(parseInt(value))}
                                defaultValue={field.value ? field.value.toString() : ''}
                        >
                            <FormControl>
                            <SelectTrigger>
                                        <SelectValue placeholder="Select Warehouse ID" />
                                    </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                    {isWarehousesLoading ? (
                                        <SelectItem value="Loading">Loading...</SelectItem>
                                    ) : (
                                        <>
                                            {warehouses &&
                                                warehouses.map((item) => (
                                                    <SelectItem
                                                        key={item.id}
                                                        value={item.id ? item.id?.toString() : ''}>
                                                        {item.name}
                                                    </SelectItem>
                                                ))}
                                        </>
                                    )}
                                </SelectContent>
                            </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="productId"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Image</FormLabel>
                        <Select
                            onValueChange={(value) => field.onChange(parseInt(value))}
                            defaultValue={field.value ? field.value.toString() : ''}
                        >
                            <FormControl>
                            <SelectTrigger>
                                        <SelectValue placeholder="Select Product ID" />
                                    </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {isProductsLoading ? (
                                    <SelectItem value="Loading">Loading...</SelectItem>
                                ) : (
                                    <>
                                        {products &&
                                            products.map((item) => (
                                                <SelectItem
                                                    key={item.id}
                                                    value={item.id ? item.id?.toString() : ''}>
                                                    {item.name}
                                                </SelectItem>
                                            ))}
                                    </>
                                )}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button className="w-full" disabled={disabled}>
                {disabled ? <Loader2 className="size-4 animate-spin" /> : 'Create'}
            </Button>
        </form>
    </Form>
    )
}

export default CreateInventoryForm
