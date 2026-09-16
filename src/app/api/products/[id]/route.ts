import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import redis from "@/lib/db/redis";

const PRODUCT_CACHE_TTL_SECONDS = 60 * 10; // 10 min

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id) {
    return Response.json({ message: "Product not found." }, { status: 400 });
  }

  const productId = Number(id);
  if (Number.isNaN(productId)) {
    return Response.json({ message: "Invalid product id." }, { status: 400 });
  }

  const cacheKey = `product:${productId}`;

  try {
    // 1. Try the cache first
    const cached = await redis.get(cacheKey);
    if (cached) {
      return Response.json(cached);
    }

    // 2. Cache miss — hit the DB
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    if (!product.length) {
      return Response.json({ message: "Product not found." }, { status: 400 });
    }

    // 3. Populate the cache for next time
    const result = await redis.set(cacheKey, product[0], {
      ex: PRODUCT_CACHE_TTL_SECONDS,
    });
    console.log(`Cache set for product ${productId}:`, result);

    return Response.json(product[0]);
  } catch (error) {
    console.error(`GET /products/${id} error:`, error);
    return Response.json(
      { message: "Failed to fetch a product" },
      { status: 500 },
    );
  }
}

// import { db } from "@/lib/db/db";
// import { products } from "@/lib/db/schema";
// import { eq } from "drizzle-orm";
// import redis from "@/lib/db/redis";

// export async function GET(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> },
// ) {
//   const { id } = await params;
//   if (!id) {
//     return Response.json({ message: "Product not found." }, { status: 400 });
//   }
//   try {
//     const product = await db
//       .select()
//       .from(products)
//       .where(eq(products.id, Number(id)))
//       .limit(1);
//     if (!product.length) {
//       return Response.json({ message: "Product not found." }, { status: 400 });
//     }

//     return Response.json(product[0]);
//   } catch (error) {
//     return Response.json(
//       { message: "Failed to fetch a product" },
//       { status: 500 },
//     );
//   }
// }
