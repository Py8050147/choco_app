import { db } from "@/lib/db/db";
import { deliveryPersons } from "@/lib/db/schema";
import { deliveryPersonSchema } from "@/lib/validators/deliveyPersonSchema";

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
    } catch (error) {
        return Response.json(
            { message: 'Failed to store the delivery person into the database' },
            { status: 500 }
        );
    }
}