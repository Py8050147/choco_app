import { db } from "@/lib/db/db";
import { orders } from "@/lib/db/schema";
import { orderSchema } from "@/lib/validators/ordesSchema";

export async function POST(request: Request) {
    const requestData = await request.json();
    let validatedData;

    try {
        validatedData = await orderSchema.parse(requestData)
    } catch (error) {
        return Response.json({ message: err }, { status: 400 });
    }

    
}