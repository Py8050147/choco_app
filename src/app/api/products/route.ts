import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { isServer, productSchema } from "@/lib/validators/productsSchema";
import { writeFile } from "node:fs/promises";
import path from "path";

export async function POST(request: Request) {
   
    const data = await request.formData();

    let validateData;

    try {
        validateData = productSchema.parse({
            name: data.get('name'),
            description: data.get('description'),
            price: Number(data.get('price')),
            image: data.get('image')
        })
    } catch (err) {
        return Response.json({ message: err }, { status: 400 });
    }

    const inputImage = isServer
        ? (validateData.image as File)
        : (validateData.image as FileList)[0];

    const fileName = `${Date.now()}.${inputImage.name.split(".").slice(-1)}`

    try {
        const buffer = Buffer.from(await inputImage.arrayBuffer())

        await writeFile(path.join(process.cwd(), 'public/assets', fileName), buffer)
    } catch (error) {
        return Response.json({ message: 'Failed to save the file to fs' }, { status: 500 });
    }

    try {
        await db.insert(products).values({ ...validateData, image: fileName })
        // todo: remove stored image from fs
    } catch (error) {
        return Response.json({message: 'Failed to store product into the database'}, {status: 500})
    }

    return Response.json({message: "ok"}, {status: 200})
}