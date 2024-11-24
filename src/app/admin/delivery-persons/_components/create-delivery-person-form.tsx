import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { deliveryPersonSchema } from '@/lib/validators/deliveyPersonSchema';

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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Warehouse } from '@/types';
import { getAllPWarehouses } from '@/http/api';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

export type FormValues = z.input<typeof deliveryPersonSchema>;

const CreateDeliveryPersonForm = ({
    onSubmit,
    disabled,
}: {
    onSubmit: (formValus: FormValues) => void;
    disabled: boolean;
    }) => {
    
        const form = useForm<z.infer<typeof deliveryPersonSchema>>({
            resolver: zodResolver(deliveryPersonSchema),
            defaultValues: {
                name: '',
                phone: '',
            },
        });
    
    const {
        data: warehouses,
        isLoading
        // isError,
     } = useQuery<Warehouse[]>({
         queryKey: ['warehouses'],
         queryFn: () => getAllPWarehouses()
    })
    
        const handleSubmit = (values: FormValues) => {
            onSubmit(values);
    };
    

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g. John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                        <Input placeholder="e.g. +918899889988" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                
                <FormField
                    control={form.control}
                    name='warehouseId'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>warehouseId</FormLabel>
                            <Select
                                onValueChange={(value) => field.onChange(parseInt(value))}
                                defaultValue={field.value ? field.value.toString() : ''}
                            >

                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Warehouse ID" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {isLoading ? (
                                        <SelectItem value="Loading">Loading...</SelectItem>
                                    ) : 
                                        (
                                            <>
                                                {warehouses && 
                                                    warehouses.map((item) => (
                                                        <SelectItem
                                                            key={item.id}
                                                            value={item.id ? item.id.toString() : ''}
                                                        >
                                                            {item.name}

                                                        </SelectItem>

                                                    ))
                                                }
                                            </>
                                        )
                                    }
                                </SelectContent>
                            </Select>
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

export default CreateDeliveryPersonForm