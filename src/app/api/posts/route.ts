import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { blogPostPayloadSchema } from "@/lib/validators/blog";
import { BlogStatus, type Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
  const session = await auth();
  const { searchParams } = new URL(request.url);
  const statusParam = searchParams.get("status");
  const take = Number(searchParams.get("take")) || 12;
  const page = Number(searchParams.get("page")) || 1;
  const skip = (page - 1) * take;

  let statusFilter: BlogStatus = BlogStatus.PUBLISHED;

  if (statusParam) {
    const normalized = statusParam.toUpperCase() as BlogStatus;

    if (!Object.values(BlogStatus).includes(normalized)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    if (normalized !== BlogStatus.PUBLISHED && session?.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    statusFilter = normalized;
  }

  const where: Prisma.BlogPostWhereInput = {
    status: statusFilter,
  };

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: [
        { publishedAt: "desc" },
        { createdAt: "desc" },
      ],
      skip,
      take,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImageUrl: true,
        category: true,
        status: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }),
    prisma.blogPost.count({ where }),
  ]);

  return NextResponse.json({
    data: posts,
    pagination: {
      total,
      page,
      take,
      pages: Math.ceil(total / take),
    },
  });
}

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await request.json();
  const parsed = blogPostPayloadSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const payload = parsed.data;

  const existing = await prisma.blogPost.findUnique({ where: { slug: payload.slug } });

  if (existing) {
    return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
  }

  const publishedAt = payload.status === "PUBLISHED" ? payload.publishedAt ?? new Date() : null;

  const post = await prisma.blogPost.create({
    data: {
      title: payload.title,
      slug: payload.slug,
      excerpt: payload.excerpt ?? null,
      content: payload.content,
      category: payload.category,
      status: payload.status,
      coverImageUrl: payload.coverImageUrl ?? null,
      coverImageKey: payload.coverImageKey ?? null,
      publishedAt,
      authorId: session.user.id,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      publishedAt: true,
    },
  });

  return NextResponse.json({ data: post }, { status: 201 });
}
