import { db } from "@/lib/db/db";
import { deliveryPersons, warehouses } from "@/lib/db/schema";
import { deliveryPersonSchema } from "@/lib/validators/deliveyPersonSchema";
import { desc, eq } from "drizzle-orm";

export async function POST(request: Request) {
    const requestData = await request.json()

    let validateData;
    try {
        validateData = await deliveryPersonSchema.parse(requestData)

    } catch (err) {
         return Response.json({ message: err }, { status: 400 });
    }

    try {
        await db.insert(deliveryPersons).values(validateData)

        return Response.json({ message: 'OK' }, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return Response.json(
            { message: 'Failed to store the delivery person into the database' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const allDeliveryPersons = await db.select({
            id: deliveryPersons.id,
            name: deliveryPersons.name,
            phone: deliveryPersons.phone,
            warehouse: warehouses.name,
        }).from(deliveryPersons).leftJoin(warehouses, eq(deliveryPersons.warehouseId, warehouses.id)).orderBy(desc(deliveryPersons.id));

        return Response.json(allDeliveryPersons);

    } catch (error) {
        return Response.json({ message: 'Failed to fetch delivery persons' }, { status: 500 });
    }
}