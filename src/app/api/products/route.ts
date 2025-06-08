import { db } from "@/lib/db/db";
import { getServerImage } from "@/lib/db/imagekit";
import { products } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { productSchema, isServer } from "@/lib/validators/productsSchema";

export async function POST(request: Request, options = {}) {
  try {
    const data = await request.formData();

    // ✅ Validate form fields
    const validatedData = productSchema.parse({
      name: data.get("name"),
      description: data.get("description"),
      price: Number(data.get("price")),
      image: data.get("image"),
    });

    // ✅ Get image file depending on environment
    const inputImage = isServer
      ? (validatedData.image as File)
      : (validatedData.image as FileList)[0];

    if (!inputImage || typeof inputImage === "string") {
      return Response.json({ message: "Invalid image file" }, { status: 400 });
    }

    const fileExtension = inputImage.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExtension}`;
    let imageUrl: string | null = null;

    // ✅ Upload image to ImageKit (skip if explicitly disabled)
    if (options.useImagekit !== false) {
      const buffer = Buffer.from(await inputImage.arrayBuffer());
      const imagekit = getServerImage();

      const uploadResult = await imagekit.upload({
        file: buffer,
        fileName,
        folder: "/choco/",
        useUniqueFileName: true,
      });

      imageUrl = uploadResult.url;
    }

    // ✅ Insert product into the database
    await db.insert(products).values({
      ...validatedData,
      image: imageUrl,
    });

    return Response.json({ message: "Product created successfully" }, { status: 200 });
  } catch (err: any) {
    const errorMessage = err?.message ?? "Something went wrong";
    console.error("POST /products error:", errorMessage);
    return Response.json({ message: errorMessage }, { status: 500 });
  }
}

export async function GET() {
  try {
    const allProducts = await db.select().from(products).orderBy(desc(products.id));
    return Response.json(allProducts);
  } catch (err) {
    console.error("GET /products error:", err);
    return Response.json({ message: "Failed to fetch products" }, { status: 500 });
  }
}



// import { db } from "@/lib/db/db";
// import { getServerImage } from "@/lib/db/imagekit";
// import { products } from "@/lib/db/schema";
// import { isServer, productSchema } from "@/lib/validators/productsSchema";
// import { desc } from "drizzle-orm";
// import { unlink, writeFile } from "node:fs/promises";
// import path from "path";

// export async function POST(request: Request, options={}) {
//   const data = await request.formData();

//   let validateData;

 

//   try {
//     validateData = productSchema.parse({
//       name: data.get("name"),
//       description: data.get("description"),
//       price: Number(data.get("price")),
//       image: data.get("image"),
//     });
//     console.log("validateData", validateData);
//   } catch (err) {
//     return Response.json({ message: err }, { status: 400 });
//   }
//   console.log("validateData", validateData);
  
//   const inputImage = isServer
//     ? (validateData.image as File)
//     : (validateData.image as FileList)[0];

//   const fileName = `${Date.now()}.${inputImage.name.split(".").slice(-1)}`;
//   // const imagePath = path.join(process.cwd(), "public/assets", fileName);
//   // console.log("imagePath", imagePath);

//   let imageUrl = null
//   try {
//   if (options.useImagekit !== false) {
//     const buffer = Buffer.from(await inputImage.arrayBuffer());
//     const imagekit = getServerImage()

//    const uploadResult = await imagekit.upload({
//       file: buffer,
//       fileName: fileName,
//       folder: '/choco/',
//       useUniqueFileName: true
//    })
    
//     imageUrl = uploadResult.url
//   }

//     // await writeFile(imagePath, buffer);
//   } catch (error) {
//     return Response.json(
//       { message: "Failed to save the file to fs" },
//       { status: 500 }
//     );
//   }

//   try {
//     await db.insert(products).values({ ...validateData, image: imageUrl });
//     // await unlink(imagePath);
//     // await writeFile(path.format(process.cwd(), 'public/assets', fileName), buffer)
//     // todo: remove stored image from fs
//   } catch (error) {
//     return Response.json(
//       { message: "Failed to store product into the database" },
//       { status: 500 }
//     );
//   }

//   return Response.json({ message: "ok" }, { status: 200 });
// }

// export async function GET() {
//   try {
//     const allProducts = await db
//       .select()
//       .from(products)
//       .orderBy(desc(products.id));
//     console.log("allProducts", allProducts);
//     return Response.json(allProducts);
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   } catch (err) {
//     return Response.json(
//       { message: "Failed to fetch products" },
//       { status: 500 }
//     );
//   }
// }
