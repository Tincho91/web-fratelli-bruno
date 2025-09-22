import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { projectPayloadSchema } from "@/lib/validators/projects";

function normalizePayload(data: Record<string, unknown>) {
  const normalized = { ...data };

  if (typeof normalized.mainImageUrl === "string") {
    normalized.mainImageUrl = normalized.mainImageUrl.trim();
  }

  if (typeof normalized.mainImageKey === "string") {
    normalized.mainImageKey = normalized.mainImageKey.trim() || null;
  }

  if (typeof normalized.secondaryImageUrl === "string") {
    const value = normalized.secondaryImageUrl.trim();
    normalized.secondaryImageUrl = value.length > 0 ? value : null;
  }

  if (typeof normalized.secondaryImageKey === "string") {
    const value = normalized.secondaryImageKey.trim();
    normalized.secondaryImageKey = value.length > 0 ? value : null;
  }

  if (typeof normalized.description === "string") {
    normalized.description = normalized.description.trim();
  }

  if (typeof normalized.relatedPostId === "string") {
    const value = normalized.relatedPostId.trim();
    normalized.relatedPostId = value.length > 0 ? value : null;
  }

  return normalized;
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;

  const exists = await prisma.projectGalleryItem.findUnique({ where: { id } });

  if (!exists) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const payload = normalizePayload(await request.json());
  const parsed = projectPayloadSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const showcaseDate = new Date(data.showcaseDate);
  const relatedPostId: string | null = data.relatedPostId ?? null;

  if (relatedPostId) {
    const relatedExists = await prisma.blogPost.findUnique({ where: { id: relatedPostId }, select: { id: true } });
    if (!relatedExists) {
      return NextResponse.json({ error: "Articolo collegato non trovato" }, { status: 404 });
    }
  }

  const project = await prisma.projectGalleryItem.update({
    where: { id },
    data: {
      description: data.description,
      showcaseDate,
      mainImageUrl: data.mainImageUrl,
      mainImageKey: data.mainImageKey ?? null,
      secondaryImageUrl: data.secondaryImageUrl ?? null,
      secondaryImageKey: data.secondaryImageKey ?? null,
      relatedPostId,
    },
    select: {
      id: true,
      showcaseDate: true,
      updatedAt: true,
    },
  });

  return NextResponse.json({ data: project });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;

  const exists = await prisma.projectGalleryItem.findUnique({ where: { id } });

  if (!exists) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.projectGalleryItem.delete({ where: { id } });

  return NextResponse.json({}, { status: 204 });
}

