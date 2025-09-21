import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isCloudinaryConfigured, uploadImageFromArrayBuffer } from "@/lib/storage";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isCloudinaryConfigured) {
    return NextResponse.json({ error: "Cloudinary is not configured" }, { status: 500 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const folderParam = formData.get("folder");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await uploadImageFromArrayBuffer({
      arrayBuffer,
      folder: typeof folderParam === "string" && folderParam.length > 0 ? folderParam : undefined,
    });

    return NextResponse.json({
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        bytes: result.bytes,
        width: result.width,
        height: result.height,
        format: result.format,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}
