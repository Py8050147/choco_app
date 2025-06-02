import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { isServer, productSchema } from "@/lib/validators/productsSchema";
import { desc } from "drizzle-orm";
import { unlink, writeFile } from "node:fs/promises";
import path from "path";

export async function POST(request: Request) {
  const data = await request.formData();

  let validateData;

  try {
    validateData = productSchema.parse({
      name: data.get("name"),
      description: data.get("description"),
      price: Number(data.get("price")),
      image: data.get("image"),
    });
    console.log("validateData", validateData);
  } catch (err) {
    return Response.json({ message: err }, { status: 400 });
  }
  console.log("validateData", validateData);

  const inputImage = isServer
    ? (validateData.image as File)
    : (validateData.image as FileList)[0];

  const fileName = `${Date.now()}.${inputImage.name.split(".").slice(-1)}`;
  const imagePath = path.join(process.cwd(), "public/assets", fileName);
  console.log("imagePath", imagePath);

  try {
    const buffer = Buffer.from(await inputImage.arrayBuffer());

    await writeFile(imagePath, buffer);
  } catch (error) {
    return Response.json(
      { message: "Failed to save the file to fs" },
      { status: 500 }
    );
  }

  try {
    await db.insert(products).values({ ...validateData, image: fileName });
    await unlink(imagePath);
    // await writeFile(path.format(process.cwd(), 'public/assets', fileName), buffer)
    // todo: remove stored image from fs
  } catch (error) {
    return Response.json(
      { message: "Failed to store product into the database" },
      { status: 500 }
    );
  }

  return Response.json({ message: "ok" }, { status: 200 });
}

export async function GET() {
  try {
    const allProducts = await db
      .select()
      .from(products)
      .orderBy(desc(products.id));
    console.log("allProducts", allProducts);
    return Response.json(allProducts);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return Response.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
