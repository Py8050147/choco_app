import { authOptions } from "@/lib/auth/authOptions";
import { db } from "@/lib/db/db";
import { orders, inventories, deliveryPersons, products, users, warehouses } from "@/lib/db/schema";
import { orderSchema } from "@/lib/validators/ordesSchema";
import { eq, and, isNull, isar, inArray } from "drizzle-orm";
import { getServerSession } from "next-auth";
import Razorpay from "razorpay"


export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    console.log('session', session);

    if (!session) {
        return Response.json({ message: 'Not allowed' }, { status: 401 });
    }

    const requestData = await request.json();
    let validatedData;

    try {
        validatedData = await orderSchema.parse(requestData)
    } catch (error) {
        return Response.json({ message: error }, { status: 400 });
    }

    const warehouseResult = await db
        .select({ id: warehouses.id })
        .from(warehouses)
        .where(eq(warehouses.pincode, validatedData.pincode));
    
        if (!warehouseResult.length) {
            return Response.json({ message: "No warehouse found" }, { status: 400 });
          }
        
    
    const foundProducts = await db
        .select()
        .from(products)
        .where(eq(products.id, validatedData.productId))
    
        if (!foundProducts.length) {
            return Response.json({ message: "No product found" }, { status: 400 });
    }
    
    let transactionError: string = "";
    let finalOrder: any = null;

    try {
        finalOrder = await db.transaction(async (tx) => {
            const order = await tx
                .insert(orders)
                .values({
                    ...validatedData,
                    // @ts-ignore
                    userId: Number(session.user.id),
                    price: foundProducts[0].price * validatedData.qty,
                    status: "received"
                })
                .returning({ id: orders.id, price: orders.price });
            
            const availableStock = await tx
                .select()
                .from(inventories)
                .where(
                    and(
                    eq(inventories.warehouseId, warehouseResult[0].id),
                    eq(inventories.productId, validatedData.productId),
                    isNull(inventories.orderId)                   
                    )
                )
                .limit(validatedData.qty).for("update", { skipLocked: true })
            
                    if (availableStock.length < validatedData.qty) {
                        transactionError = `Stock is low, only ${availableStock.length} products available`;
                        tx.rollback();
                        return null;
            }
            

            const availablePersons = await tx
                .select()
                .from(deliveryPersons)
                .where(and(
                    isNull(deliveryPersons.orderId),
                    eq(deliveryPersons.warehouseId, warehouseResult[0].id)
                )).for("update").limit(1)
            
                    if (!availablePersons.length) {
                        transactionError = `Delivery person is not available at the moment`;
                        tx.rollback();
                        return null;
            }
            
            await tx
                .update(inventories)
                .set({ orderId: order[0].id })
                .where(
                    inArray(
                        inventories.id,
                        availableStock.map((stock) => stock.id)
                    )
            );
            
            await tx
                .update(deliveryPersons)
                .set({ orderId: order[0].id })
                .where(eq(deliveryPersons.id, availableStock[0].id));
            
                await tx
                .update(orders)
                .set({ status: "reserved" })
                .where(eq(orders.id, order[0].id));
        
              return order[0];
        })


    } catch (error) {
        console.error("Transaction error:", error);
    return Response.json(
      {
        message: transactionError
          ? transactionError
          : "Error while db transaction",
      },
      { status: 500 }
    );
    }

    if (!finalOrder) {
        return Response.json(
            { message: transactionError || "Failed to create order" },
            { status: 500 }
          );
    }

    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });
    
    const razorpayOrderOptions = {
        amount: finalOrder.price * 50,
        currency: "INR",
        receipt: `order_rcptid_${finalOrder.id}`,
        notes: {
            orderId: finalOrder.id.toString(),
            // @ts-ignore
            userId: Number(session.user.id), // change useId of add next/auth userid
          },
    }

    try {
        const order = await razorpay.orders.create(razorpayOrderOptions)
        return Response.json({
            razorpayOrderId: order.id,
            amount: order.amount,
            currency: order.currency,
            key: process.env.RAZORPAY_KEY_ID,
          });
    } catch (error) {
        console.error("Razorpay error:", error);
        return Response.json(
          { message: "Failed to create Razorpay order" },
          { status: 500 }
        );
    }
}