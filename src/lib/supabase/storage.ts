import { createClient } from "@/lib/supabase/client";

export async function uploadServiceImage(file: File, oldImageUrl?: string | null) {
    const supabase = createClient();

    const BUCKET_NAME = 'Images';
    const FOLDER_NAME = 'services';
    const basePath = `https://dgcujlqcchpijdecowag.supabase.co/storage/v1/object/public/${BUCKET_NAME}/`;

    if (oldImageUrl) {
        if (oldImageUrl.includes(basePath)) {
            const oldFilePath = oldImageUrl.split(basePath)[1];

            if (oldFilePath) {
                await supabase.storage.from(BUCKET_NAME).remove([oldFilePath]);
            }
        }
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

    const relativeFilePath = `${FOLDER_NAME}/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(relativeFilePath, file, { cacheControl: '3600', upsert: false });

    if (uploadError) {
        console.error("[STORAGE_UPLOAD_ERROR]:", uploadError);
        throw new Error("Error al subir la imagen a Supabase.");
    }

    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(relativeFilePath);

    return data.publicUrl;
}