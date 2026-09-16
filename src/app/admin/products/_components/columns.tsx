'use client';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Product } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';
// import Image from 'next/image';
import { Image } from '@imagekit/next'


export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: 'name',
        header: 'Product Name',
        cell: ({ row }) => (
            <div className="font-medium text-gray-900">{row.getValue('name')}</div>
        ),
    },
    {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => (
            <span className="font-bold text-amber-600">${row.getValue('price')}</span>
        ),
    },
    {
        accessorKey: 'image',
        header: 'Image',
        cell: ({ row }) => {
            const imageUrl = row.getValue('image') as string | null | undefined;
            return (
                <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-gray-200">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt="Product"
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-400">🍫</span>
                        </div>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: 'createdAt',
        header: 'Added',
        cell: ({ row }) => {
            const dateValue = row.getValue('createdAt') as string | number | Date | undefined;
            if (!dateValue) return <span className="text-gray-400">-</span>;

            const date = new Date(dateValue);
            if (Number.isNaN(date.getTime())) return <span className="text-gray-400">-</span>;

            return (
                <span className="text-gray-600 text-sm">
                    {date.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    })}
                </span>
            );
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-amber-50">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4 text-gray-500" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel className="text-amber-700 font-semibold">Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-amber-50">
                            <Eye className="h-4 w-4 text-blue-500" />
                            <span>View Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-amber-50">
                            <Edit className="h-4 w-4 text-amber-500" />
                            <span>Edit Product</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
