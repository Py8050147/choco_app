import { z } from 'zod';

export const orderStatusSchema = z.object({
    orderId: z.number({ message: 'Order Id should be a number' }),
    status: z.enum(['received', 'paid', 'reserved', 'completed'], {
        required_error: 'Status is required',
        invalid_type_error: 'Status must be one of: received, paid, reserved, completed',
    }),
});