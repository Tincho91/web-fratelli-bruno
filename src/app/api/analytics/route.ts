import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { InteractionType } from "@prisma/client";
import { z } from "zod";

const payloadSchema = z.object({
  type: z.nativeEnum(InteractionType),
  postSlug: z.string().min(1).optional(),
  projectId: z.string().min(1).optional(),
  metadata: z.record(z.any()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const parsed = payloadSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;
    let postId: string | null = null;
    let projectId: string | null = null;

    if (data.type === InteractionType.ARTICLE_VIEW) {
      if (!data.postSlug) {
        return NextResponse.json({ error: "Missing postSlug" }, { status: 400 });
      }

      const post = await prisma.blogPost.findUnique({
        where: { slug: data.postSlug },
        select: { id: true },
      });

      if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }

      postId = post.id;
    }

    if (data.type === InteractionType.PROJECT_VIEW) {
      if (!data.projectId) {
        return NextResponse.json({ error: "Missing projectId" }, { status: 400 });
      }

      const project = await prisma.projectGalleryItem.findUnique({
        where: { id: data.projectId },
        select: { id: true },
      });

      if (!project) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
      }

      projectId = project.id;
    }

    await prisma.interactionEvent.create({
      data: {
        type: data.type,
        postId,
        projectId,
        metadata: data.metadata ?? null,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
