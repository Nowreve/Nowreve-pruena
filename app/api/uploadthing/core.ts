import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    photo: f({
        image: { maxFileSize: "4MB", maxFileCount: 1 },
    })
    .middleware(async (req) => {
        const { userId } = auth(); // Asegúrate de pasar `req`
        
        if (!userId) throw new Error("Unauthorized");

        return { userId };
    })
    .onUploadComplete(() => {
        // Lógica que deseas ejecutar al completar la carga
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
