import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { blogPostPayloadSchema } from "@/lib/validators/blog";
import { BlogStatus } from "@prisma/client";

interface RouteContext {
  params: {
    slug: string;
  };
}

export async function GET(_request: NextRequest, context: RouteContext) {
  const { slug } = context.params;
  const session = await auth();

  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: {
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!post) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  if (post.status !== BlogStatus.PUBLISHED && session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json({ data: post });
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = context.params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });

  if (!post) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  const json = await request.json();
  const parsed = blogPostPayloadSchema.partial().safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const payload = parsed.data;

  if (payload.slug && payload.slug !== slug) {
    const exists = await prisma.blogPost.findUnique({ where: { slug: payload.slug } });

    if (exists) {
      return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
    }
  }

  const nextStatus = payload.status ?? post.status;
  const publishedAt =
    nextStatus === "PUBLISHED"
      ? payload.publishedAt ?? post.publishedAt ?? new Date()
      : null;

  const updated = await prisma.blogPost.update({
    where: { slug },
    data: {
      title: payload.title ?? post.title,
      slug: payload.slug ?? post.slug,
      excerpt: payload.excerpt ?? post.excerpt,
      content: payload.content ?? post.content,
      category: payload.category ?? post.category,
      status: nextStatus,
      coverImageUrl: payload.coverImageUrl ?? post.coverImageUrl,
      coverImageKey: payload.coverImageKey ?? post.coverImageKey,
      publishedAt,
    },
  });

  return NextResponse.json({ data: updated });
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = context.params;

  await prisma.blogPost.delete({ where: { slug } });

  return new NextResponse(null, { status: 204 });
}
